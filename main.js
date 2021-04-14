document.getElementById('userform').addEventListener('submit', function (e) {
    e.preventDefault();
    let output = document.getElementById('result');
    output.innerHTML = "Loading..";
    let getSearchVal = document.getElementById('searchInput').value;
    let searchVal = getSearchVal.split(' ').join('');
    setTimeout(()=>{
        const getApi = async () => {
            let url = `https://api.github.com/search/users?q=${searchVal}&per_page=100`;
            let fetchUrl = await fetch(url);
            let { items } = await fetchUrl.json();
            let text = "";
            if(items.length != 0){
                items.forEach(el => {
                    text += `<div>
                                <a href="${el.html_url}" target="_blank">
                                    <img src="${el.avatar_url}" alt="user pic">
                                </a>
                                <a href="${el.html_url}" target="_blank">
                                    <h3>${el.login}</h3>
                                </a>
                            </div>`;
                });
                output.innerHTML = text;
            }else{
                output.innerHTML = "<b>User Not Found !</b>";
            }
            
        }
        getApi();
    },2000)
})