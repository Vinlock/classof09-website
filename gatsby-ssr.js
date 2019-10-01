const React = require('react');

export const onRenderBody = ({ pathname, setPreBodyComponents, setPostBodyComponents, setHeadComponents }) => {
  console.log('pathname', pathname);
  console.log('pathname', pathname);
  console.log('pathname', pathname);
  console.log('pathname', pathname);

  const headComponents = [];
  const preBodyComponents = [];
  const postBodyComponents = [];

  headComponents.push(React.createElement('script', {
    key: 0,
    src: "https://kit.fontawesome.com/f5a5fcf29f.js",
  }));

  preBodyComponents.push(React.createElement('script', {
    key: 0,
    dangerouslySetInnerHTML: {
      __html: `
        window.fbAsyncInit = function() {
          FB.init({
            appId      : '${process.env.GATSBY_FACEBOOK_APP_ID}',
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
  }));

  postBodyComponents.push(React.createElement('script', {
    key: 1,
    src: 'https://www.eventbrite.com/static/widgets/eb_widgets.js',
  }));

  setHeadComponents(headComponents);
  setPreBodyComponents(preBodyComponents);
  setPostBodyComponents(postBodyComponents);
};