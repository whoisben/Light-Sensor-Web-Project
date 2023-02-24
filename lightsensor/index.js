start_btn = document.querySelector(".start-btn")
start_btn.onclick = function () {
    if (!('ondevicelight' in window)) {
        document.getElementById("support-info").classList.remove("hidden");
        this.innerHTML = "Failed!"
        this.style = "background: #EF4444; color:#F8FAFC; pointer-events: none"
        var ansswer = confirm("Sorry, your browser does not support this feature, please click OK to download a supported browser!");
        if (ansswer) {
            window.location = 'https://androidapksfree.com/firefox/org-mozilla-firefox/download-old/firefox-60-0-2015556161-apk-download/';
        }
    } else {
        document.getElementById("measure-info").classList.remove("hidden");
        document.getElementById("collect-info").classList.remove("hidden");
        var lightValue = document.getElementById("value-show");
        var lightCollect = function (e) {
            lightValue.innerHTML = e.value;
            fetch('http://175.178.118.138:9999/add', {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "value": e.value
                })
            }).then(function (res) {
                console.log(res)
            }).catch(function (e) {
                console.log(e)
            })
            if (e.value < 10) {
                document.body.className = "dark";
            } else if (e.value < 1500) {
                document.body.className = "normal";
            } else {
                document.body.className = "light";
            }
        }
        window.addEventListener('devicelight', lightCollect)
        this.innerHTML = "<div class='loader'></div>"
        setTimeout(() => {
            window.removeEventListener('devicelight', lightCollect);
            document.getElementById("measure-info").classList.add("hidden");
            document.getElementById("collect-info").classList.add("hidden");
            this.innerHTML = "Collected!"
            this.style = "background: #f1f5f4; color:#333; pointer-events: none"
        }, 10000)
    }
}