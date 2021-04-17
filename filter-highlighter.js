// Filter Highligher
//
// Adds style and title text to links to edit filters, showing filter status, actions, etc.
//
//<nowiki>

(function() {

var have_css = false;

function filter_highlighter($content) {
	var config = { 	// Default configuartion
		// Local name of abuse filter pages
		filter_page: "Special:AbuseFilter",

		// Don't bother fetching filter info unless our copy is this old
		cache_seconds : 30 * 60,

		// Stylesheet, or null for none
		style : "User:JJPMaster/filter-highlighter.css",

		// Show title text?
		show_title: true,

		// Highlight background of Special:AbuseFilter/nnn?
		style_editor: false,

		// Probably no need to change anything here
		max_filters: 2000,
		max_query_size: 500
	};

	var wconfig = window.filterHighlighterConfig || {};
	for (var conf in wconfig)
		if (config.hasOwnProperty(conf) && wconfig.hasOwnProperty(conf))
			config[conf] = wconfig[conf];

	var start = config.max_filters, end = 0;
	var links = [];

	// Find anything that looks like a sane link to a local abuse filter, and index it by filter id for later use
	var match_re = new RegExp("^" + mw.config.get('wgArticlePath').replace("$1", config.filter_page + "/([0-9]{1,4})") + "$");

	$content.find('a[href*="' + config.filter_page + '"]').each(function(index, link) {
		var uri = new mw.Uri(link.href);
		var id_match = match_re.exec(uri.path);

		if (id_match && (uri.host === mw.config.get('wgServerName')
						 || uri.host === window.location.host)) {
			var id = id_match[1];

			if (0 < id && id <= config.max_filters) {
				start = Math.min(start, id);
				end = Math.max(end, id);

				if (links[id] !== undefined)
					links[id].push(link);
				else
					links[id] = [link];
			}
		}
	});

	var $form = $content.find("#mw-abusefilter-editing-form");
	var want_css = false;

	if (config.style && config.style_editor && $form.length) {
		style_editor();
		$('input[type=checkbox]').click(style_editor);
		want_css = true;
	}

	if (config.style && start <= end)
		want_css = true;

	// Load style if user hasn't opted-out
	if (want_css && !have_css) {
		var url = /^https?:\/\//.test(config.style) ? config.style :
			(mw.config.get('wgScriptPath') + "/index.php?title=" +
			 encodeURIComponent(config.style) + "&action=raw&ctype=text/css");

		mw.loader.load( url, 'text/css' );

		have_css = true;
	}

	if (start > end)
		return;

	// Normalize requests if caching
	if (config.cache_seconds > 0) {
		start = 1;
		end += config.max_query_size - 1;
		end -= end % config.max_query_size;
	}

	// Fetch the information for any relevant filters
	for (; start <= end; start += config.max_query_size) {
		(new mw.Api()).get( {
			action: 'query',
			list: 'abusefilters',
			abfprop: 'id|description|actions|hits|lasteditor|lastedittime|private|status',
			abfstartid: start,
			abflimit: Math.min(end - start + 1, config.max_query_size),
			maxage: config.cache_seconds,
			smaxage: config.cache_seconds
		}).done(mark_filters);
	}

	// Given a batch of filters, add CSS classes and title text to all the relevant links
	function mark_filters(response) {
		if (!response || !response.query || !response.query.abusefilters)
			return;

		response.query.abusefilters.forEach(function(filter) {
			if (links[filter.id] !== undefined)
				links[filter.id].forEach(function(link) {
					if (config.show_title)
						link.title = filter_desc(filter);

					$(link).addClass(filter_classes(filter).join(" "));
				});
		});
	}

	// Given the filter parameters, return an human-readable string
	function filter_desc(filter) {
		var desc = "Filter " + filter.id + ": \"" + filter.description + "\" (";

		desc += (filter.private !== undefined) ? "private, " : "public, ";
		desc += (filter.deleted !== undefined) ? "deleted, " : "";
		desc += (filter.enabled !== undefined) ? "enabled, " : "disabled, ";

		desc += filter.actions ? filter.actions.replace(",", ", ") + ", " : "";
		desc += filter.hits + " hits, last modified by " + filter.lasteditor + " at " + filter.lastedittime + ")";

		return desc;
	}

	// Given the filter parameters, return an array of classes for styling
	function filter_classes(filter) {
		var actions = ["throttle", "tag", "warn", "disallow", "blockautopromote", "block", "rangeblock", "degroup"];
		var classes = [];
		var real_action = false;

		classes.push((filter.private !== undefined) ? "filter-highlighter-private" : "filter-highlighter-public");
		classes.push((filter.deleted !== undefined) ? "filter-highlighter-deleted" : "filter-highlighter-notdeleted");
		classes.push((filter.enabled !== undefined) ? "filter-highlighter-enabled" : "filter-highlighter-disabled");

		actions.forEach(function(action) {
			if (filter.actions.includes(action)) {
				classes.push("filter-highlighter-" + action);

				// "throttle" with no other action is still just long-only
				if (action != "throttle")
					real_action = true;
			}
		});

		if (!real_action)
			classes.push("filter-highlighter-noaction");

		return classes;
	}

	// Add style to the filter editing form
	function style_editor() {
		$form.removeClass("filter-highlighter-public filter-highlighter-private filter-highlighter-noaction filter-highlighter-tag filter-highlighter-warn filter-highlighter-disallow filter-highlighter-blockautopromote");

		$form.addClass("filter-highlighter");

		if ($('[name=wpFilterHidden]').is(':checked'))
			$form.addClass("filter-highlighter-private");
		else
			$form.addClass("filter-highlighter-public");

		if (!$('[name=wpFilterEnabled]').is(':checked'))
			return;

		if ($('[name=wpFilterActionBlockautopromote]').is(':checked'))
			$form.addClass("filter-highlighter-blockautopromote");
		else if ($('[name=wpFilterActionDisallow]').is(':checked'))
			$form.addClass("filter-highlighter-disallow");
		else if ($('[name=wpFilterActionWarn]').is(':checked'))
			$form.addClass("filter-highlighter-warn");
		else if ($('[name=wpFilterActionTag]').is(':checked'))
			$form.addClass("filter-highlighter-tag");
		else
			$form.addClass("filter-highlighter-noaction");
	}
}

mw.loader.using(['mediawiki.api', 'mediawiki.Uri'],
				() => mw.hook('wikipage.content').add(filter_highlighter));

})();
//</nowiki>
