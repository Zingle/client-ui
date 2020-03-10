const init = callback => {
    window.fbAsyncInit = callback;

    (function(d, s, id){
        let js, fjs = d.getElementsByTagName(s)[0];

        if (d.getElementById(id)) {return;}

        js = d.createElement(s); js.id = id;
        js.src = '//connect.facebook.net/en_US/sdk.js';
        fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
};

export default init;