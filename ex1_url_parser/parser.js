var form = document.getElementById('url-form');
form.addEventListener('submit', function(e) {
    e.preventDefault();
    var uri = document.getElementById('uri-box').value;
    var uriParts = parseUri(uri);
    render(uriParts);
});

function render(uriParts) {
    document.getElementById('parts').className = '';
    for (var key in uriParts) {
        document.getElementById(key + '-value').innerHTML = uriParts[key];
    }
}

function parseUri(uri) {
    var uriParts = {
        scheme: '',
        authority: '',
        path: '',
        query: '',
        fragment: ''
    };

    //add your code here
    var qMark = uri.indexOf("?"),
            hash = uri.indexOf("#"),
            endScheme = uri.indexOf(":"),
            startAuthority = 0;

    if(uri.indexOf("://") > -1){
        startAuthority = uri.indexOf("://");      
    } else if(uri.indexOf(":") > -1){
        startAuthority = uri.indexOf(":");
    }

    uriParts.scheme = uri.substring(0,startAuthority);

    if(qMark > -1 && hash > -1){
        if(qMark < hash){
            uriParts.authority = uri.substring(startAuthority, qMark);
            uriParts.query = uri.substring(qMark + 1, hash);
            uriParts.fragment = uri.substring(hash + 1);
        } else{
            uriParts.authority = uri.substring(startAuthority, hash);
            uriParts.fragment = uri.substring(hash + 1);
        }
    } else{
        if(qMark > -1){
            uriParts.authority = uri.substring(startAuthority, qMark);
            uriParts.query = uri.substring(qMark + 1);
        } else if(hash > -1){
            uriParts.authority = uri.substring(startAuthority, hash);
            uriParts.fragment = uri.substring(hash + 1);
        } else{
            uriParts.authority = uri.substring(startAuthority);
        }
    }

    if(uriParts.authority.indexOf("://") >= 0){
        uriParts.authority = uriParts.authority.substring(3);

        if(uriParts.authority.indexOf("/") >= 0 ){
            uriParts.path = uriParts.authority.substring(uriParts.authority.indexOf("/"));
            uriParts.authority = uriParts.authority.substring(0, uriParts.authority.indexOf("/"));
        }
    }
    else{
        if(uriParts.scheme !== ''){
            uriParts.path = uriParts.authority.substring(1);
            uriParts.authority = '';
        }
        else{
            uriParts.authority = uriParts.authority.substring(0);

            if(uriParts.authority.indexOf("/") > -1){
                uriParts.path = uriParts.authority.substring(uriParts.authority.indexOf("/"));
                uriParts.authority = uriParts.authority.substring(0, uriParts.authority.indexOf("/"));
            }
        }
    }
    
    if(uriParts.path === "/"){
        uriParts.path = '';
    }
    
    return uriParts;
}