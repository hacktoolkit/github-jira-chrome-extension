$(function() {
    console.log("GitHub JIRA Issue Links Rewriter Extension is loaded");

    var GITHUB_COMMENT_TAG_SELECTORS = [
        '.js-issue-title',
        '.comment-body'
    ];
    var jiraIssueBaseUrl = '';

    function scanAndReplaceJIRAIssueTags() {
        _.each(GITHUB_COMMENT_TAG_SELECTORS, function(tagSelector) {
            var elements = $(tagSelector);
            _.each(elements, function(element) {
                var text = $(element).html();
                var rewritten = text.replace(
                    /\[([a-zA-Z]+)-(\d+)\]/,
                    function(match, issuePrefix, issueNumber) {
                        var issueId = issuePrefix + '-' + issueNumber;
                        var issueUrl = jiraIssueBaseUrl + '/' + issueId;
                        var replacement = '[<a href="' + issueUrl + '" target="_blank">' + issueId + '</a>]';
                        return replacement;
                    }
                );
                $(element).html(rewritten);
            });
        });
    }

    function initEventHandlers() {
    }

    function init() {
        chrome.storage.sync.get({
            jiraIssueBaseUrl: ''
        }, function(items) {
            jiraIssueBaseUrl = items.jiraIssueBaseUrl;
            console.log('JIRA Issue Base URL: ', jiraIssueBaseUrl);
            scanAndReplaceJIRAIssueTags();
        });
    }

    initEventHandlers();
    init();
});
