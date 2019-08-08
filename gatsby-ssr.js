const React = require('react');

export const onRenderBody = ({ setPostBodyComponents }) => {
  const typeformScript = React.createElement('script', {
    key: 0,
    dangerouslySetInnerHTML: {
      __html: `
        var qs, js, q, s, d = document, gi = d.getElementById, ce = d.createElement, gt = d.getElementsByTagName,
          id = "typef_orm_share", b = "https://embed.typeform.com/";
        if (!gi.call(d, id)) {
          js = ce.call(d, "script");
          js.id = id;
          js.src = b + "embed.js";
          q = gt.call(d, "script")[0];
          q.parentNode.insertBefore(js, q)
        }
      `,
    },
  });
  const fbScript = React.createElement('script', {
    key: 0,
    dangerouslySetInnerHTML: {
      __html: `
        window.fbAsyncInit = function() {
          FB.init({
            appId: '383119815722288',
            cookie: true,
            xfbml: true
          })
          FB.AppEvents.logPageView();
        };

        (function(d, s, id) {
          var js, fjs = d.getElementsByTagName(s)[0];
          if (d.getElementById(id)) {return;}
          js = d.createElement(s); js.id = id;
          js.src = "https://connect.facebook.net/en_US/sdk.js";
          fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));
      `,
    },
  });
  setPostBodyComponents([typeformScript, fbScript]);
};