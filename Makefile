## help - Display help about make targets for this Makefile
help:
	@cat Makefile | grep '^## ' --color=never | cut -c4- | sed -e "`printf 's/ - /\t- /;'`" | column -s "`printf '\t'`" -t

## clean - remove all build artifacts
clean:
	rm -f *.zip

## package - creates a new package
package: clean
	7z a github_jira.zip `cat FILES`
