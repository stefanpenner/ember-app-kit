module.exports = {
    options: {
      key: '<%= env.AWS_ACCESS_KEY_ID %>',
      secret: '<%= env.AWS_SECRET_ACCESS_KEY %>',
      bucket: '<%= env.AWS_BUCKET %>',
      access: 'public-read',
      headers: {
        // Two Year cache policy (1000 * 60 * 60 * 24 * 730)
        //"Cache-Control": "max-age=630720000, public",
        //"Expires": new Date(Date.now() + 63072000000).toUTCString()
      }
    },
    deploy: {
      upload: [
        {
          // make sure this document is newer than the one on S3 and replace it
          src: 'dist/**/*',
          rel: 'dist/',
        },
      ]
    }
};
