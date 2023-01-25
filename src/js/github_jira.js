if (window.location.hostname.match(/^.*git.*$/)) {
    (function () {
        console.log('GitHub JIRA Issue Links Rewriter Extension is loaded');

        const GITHUB_COMMENT_TAG_SELECTORS = [
            'js-issue-title',
            'comment-body',
            'commit-title',
        ];
        let jiraIssueBaseUrl = '';

        function scanAndReplaceJIRAIssueTags() {
            GITHUB_COMMENT_TAG_SELECTORS.forEach((tagSelector) => {
                const elements = document.querySelectorAll(`.${tagSelector}`);
                elements.forEach((element) => {
                    const text = element.innerHTML;
                    const rewritten = text.replace(
                        /\[([a-zA-Z]+)-(\d+)\]/,
                        function (match, issuePrefix, issueNumber) {
                            const issueId = issuePrefix + '-' + issueNumber;
                            const issueUrl = jiraIssueBaseUrl + '/' + issueId;
                            const replacement = `[<a href="${issueUrl}" target="_blank">${issueId}</a>]`;
                            return replacement;
                        }
                    );
                    element.innerHTML = rewritten;
                });
            });
        }

        function initEventHandlers() {}

        function init() {
            chrome.storage.sync.get(
                {
                    jiraIssueBaseUrl: '',
                },
                function (items) {
                    jiraIssueBaseUrl = items.jiraIssueBaseUrl;
                    console.log('JIRA Issue Base URL: ', jiraIssueBaseUrl);
                    scanAndReplaceJIRAIssueTags();
                }
            );
        }

        initEventHandlers();
        init();
    })();
}
