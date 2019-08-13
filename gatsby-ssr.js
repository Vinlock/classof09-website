const React = require('react');

export const onRenderBody = ({ setPreBodyComponents, setHeadComponents }) => {
  const fontAwesomeScript = React.createElement('script', {
    src: "https://kit.fontawesome.com/f5a5fcf29f.js",
  });
  const fbScript = React.createElement('script', {
    key: 0,
    dangerouslySetInnerHTML: {
      __html: `
        window.fbAsyncInit = function() {
          FB.init({
            appId      : '383119815722288',
            xfbml      : true,
            version    : 'v4.0'
          });
          FB.AppEvents.logPageView();
        };
      
        (function(d, s, id){
           var js, fjs = d.getElementsByTagName(s)[0];
           if (d.getElementById(id)) {return;}
           js = d.createElement(s); js.id = id;
           js.src = "https://connect.facebook.net/en_US/sdk.js";
           fjs.parentNode.insertBefore(js, fjs);
         }(document, 'script', 'facebook-jssdk'));
      `,
    },
  });
  setHeadComponents([fontAwesomeScript]);
  setPreBodyComponents([fbScript]);
};