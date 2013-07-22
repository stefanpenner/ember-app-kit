module.exports = {
  "deployToGithubPages": {
    remote: "origin",
    command: [
        'REMOTE_URL=`git ls-remote --get-url`',
        'git init',
        'git add .',
        'git commit -m "Site updated"',
        'echo "Publishing gh-pages to $REMOTE_URL..."',
        'git push $REMOTE_URL master:refs/heads/gh-pages --force',
        'rm -rf .git',
    ].join('&&'),
    options: {
      stdout: true,
      failOnError: true,
      execOptions: {
        cwd: 'dist'
      }
    }
  }
};