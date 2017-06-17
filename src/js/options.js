$(function() {
    var DEFAULT_JIRA_ISSUE_BASE_URL_SUFFIX = '.atlassian.net/browse';
    var hasEnteredJiraIssueBaseUrl = false;

    // Saves options to chrome.storage.sync.
    function saveOptions() {
        var companyPrefix = $('#company_prefix').val();
        var jiraIssueBaseUrl = $('#jira_issue_base_url').val();
        chrome.storage.sync.set({
            companyPrefix: companyPrefix,
            jiraIssueBaseUrl: jiraIssueBaseUrl
        }, function() {
            // Update status to let user know options were saved.
            $('#status').html('Options saved.');
        });
    }

    // Restores option values state using the preferences
    // stored in chrome.storage.
    function restoreOptions() {
        chrome.storage.sync.get({
            companyPrefix: '',
            jiraIssueBaseUrl: ''
        }, function(items) {
            $('#company_prefix').val(items.companyPrefix);
            hasEnteredJiraIssueBaseUrl = !!items.jiraIssueBaseUrl;
            $('#jira_issue_base_url').val(items.jiraIssueBaseUrl);
        });
    }

    function initEventHandlers() {
        $('#save').click(saveOptions);
        $('#company_prefix').on('input', function() {
            var jiraIssueBaseUrl = $('#jira_issue_base_url').val();
            if (!hasEnteredJiraIssueBaseUrl || !jiraIssueBaseUrl.match(/^https?:\/\/.*/)) {
                jiraIssueBaseUrl = 'https://'  + $('#company_prefix').val() + DEFAULT_JIRA_ISSUE_BASE_URL_SUFFIX;
                $('#jira_issue_base_url').val(jiraIssueBaseUrl);
            }
        });
    }

    function init() {
        restoreOptions();
    }

    initEventHandlers();
    init();
});
