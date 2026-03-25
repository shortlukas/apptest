function $(id) {
    return document.getElementById(id);
}

let data = {
    alarms: [{label: "vocab", month: "Feb", day: 20, hour: "12", minute: "30", ampm: "AM", id: 101}],
    reminders: [{label: "vocab", month: "Feb", day: 20, hour: "12", minute: "30", ampm: "AM", id: 101, state: 0, sync: false}],
    r_alarms: [],
    r_reminders: []
}

let thisScreen = "home";

const screens = {
    "home" : 0,
    "reminders" : -402,
    "alarms" : -804,
    "settings" : -1206,
    "user" : -1608
}

const calender = {
    "Jan" : 31,
    "Feb" : 28,
    "Mar" : 31,
    "Apr" : 30,
    "May" : 31,
    "Jun" : 30,
    "Jul" : 31,
    "Aug" : 31,
    "Sep" : 30,
    "Oct" : 31,
    "Nov" : 30,
    "Dec" : 31,
}

let setreminder = {
    sync: false,
    month: "Jan",
    day: 1,
    hour: 1,
    minute: 1,
    ampm: "AM"
}
let setalarm = {
    hour: 1,
    minute: 1,
    ampm: "AM"
}

let editalarm = {
    hour: 1,
    minute: 1,
    ampm: "AM"
}

document.addEventListener("DOMContentLoaded", function() {
    updateHomeScreen();

    $("home-btn").addEventListener("click", function() {goScreen("home")})
    $("reminders-btn").addEventListener("click", function() {goScreen("reminders")})
    $("alarms-btn").addEventListener("click", function() {goScreen("alarms")})
    $("settings-btn").addEventListener("click", function() {goScreen("settings")})
    $("user-btn").addEventListener("click", function() {goScreen("user")})

    $("general-btn").addEventListener("click", function() {showPopup("settings-general")});
    let backbtns = document.getElementsByClassName("back-btn");
    for(let obj of backbtns) {obj.addEventListener("click", function() {clearPopups()})}

    $("add-reminder-btn").addEventListener("click", function() {showPopup("reminders-add")});
    $("add-reminder-btn2").addEventListener("click", function() {showPopup("reminders-add")});

    $("add-alarm-btn").addEventListener("click", function() {showPopup("alarms-add")});
    $("add-alarm-btn2").addEventListener("click", function() {showPopup("alarms-add")});

    $("alarm-toggle").addEventListener("click", function() {
        let d = $("alarm-dropdown")
        if(d.classList.contains("on")) {
            d.classList.toggle("on", false)
            $("alarm-toggle-icon").src = "./images/check.png";
            setreminder.sync = false;
        
        }
        else {
            d.classList.toggle("on", true);
            $("alarm-toggle-icon").src = "./images/check-select.png";
            setreminder.sync = true;
        }
    })

    $("reminder-create-btn").addEventListener("click", function() {createReminder()});
    $("alarm-create-btn").addEventListener("click", function() {createAlarm()});

    let months = document.getElementsByClassName("month scroll-opt");
    for(let obj of months) {obj.addEventListener("click", function() {
        for(let a of months) {a.classList.toggle("select", false)}
        obj.classList.toggle("select", true);
        setreminder.month = obj.innerHTML;
        fillDays(calender[obj.id]);
    })}

    let ampm = document.getElementsByClassName("ampm scroll-opt");
    for(let obj of ampm) {obj.addEventListener("click", function() {
        for(let a of ampm) {a.classList.toggle("select", false)}
        obj.classList.toggle("select", true);
        setreminder.ampm = obj.innerHTML;
        setalarm.ampm = obj.innerHTML;
        editalarm.ampm = obj.innerHTML;
    })}
    
    fillDays(31);

    for(let i = 1; i < 13; i++) {
        let opt = document.createElement("div");
        opt.className = "hour scroll-opt";
        opt.innerHTML = i;

        function hourClick() {
            let hours = document.getElementsByClassName("hour scroll-opt");
            for(let obj of hours) {obj.classList.toggle("select", false)}
            this.classList.toggle("select", true);
            setreminder.hour = this.innerHTML;
            setalarm.hour = this.innerHTML;
            editalarm.hour = this.innerHTML;
        };
        opt.addEventListener("click", hourClick);
        
        const opt2 = opt.cloneNode(true);
        const opt3 = opt2.cloneNode(true);
        opt2.addEventListener("click", hourClick);
        opt3.addEventListener("click", hourClick);
        $("reminder-hour").appendChild(opt);
        $("alarm-hour").appendChild(opt2);
        $("alarm-edit-hour").appendChild(opt3);
    }
    for(let i = 0; i < 60; i++) {
        let opt = document.createElement("div");
        opt.className = "minute scroll-opt";
        opt.innerHTML = (i < 10 ? "0" : "") + i;
        function minuteClick() {
            let minutes = document.getElementsByClassName("minute scroll-opt");
            for(let obj of minutes) {obj.classList.toggle("select", false)}
            this.classList.toggle("select", true);
            setreminder.minute = this.innerHTML;
            setalarm.minute = this.innerHTML;
            editalarm.minute = this.innerHTML;
        };
        opt.addEventListener("click", minuteClick);
        const opt2 = opt.cloneNode(true);
        const opt3 = opt2.cloneNode(true);
        opt2.addEventListener("click", minuteClick);
        opt3.addEventListener("click", minuteClick);
        $("reminder-minute").appendChild(opt);
        $("alarm-minute").appendChild(opt2);
        $("alarm-edit-minute").appendChild(opt3);
    }
})

function fillDays(n) {
    $("reminder-day").innerHTML = "";
    for(let i = 1; i < n+1; i++) {
        let opt = document.createElement("div");
        opt.className = "day scroll-opt";
        opt.innerHTML = i;

        let days = document.getElementsByClassName("day scroll-opt");
        opt.addEventListener("click", function() {
            for(let a of days) {a.classList.toggle("select", false)}
            opt.classList.toggle("select", true);
            setreminder.day = opt.innerHTML;
        })

        $("reminder-day").appendChild(opt);
    }
}

function goScreen(a) {
    if(thisScreen == a) {return}
    $("screens").style.transform = `translateX(${screens[a]}px)`;
    thisScreen = a;
    clearPopups();
    updateScreen();

    console.log("here");
    $("home-icon").src = "./images/home.png";
    $("alarms-icon").src = "./images/alarms.png";
    $("reminders-icon").src = "./images/reminders.png";
    $("settings-icon").src = "./images/settings.png";
    $("user-icon").src = "./images/user.png";
    console.log($("" + thisScreen + "-btn"));
    $("" + thisScreen + "-icon").src = "./images/" + thisScreen + "-select.png";
}

function showPopup(a) {
    let popups = document.getElementsByClassName("popup");
    for(let obj of popups) {obj.classList.toggle("on", false)}
    $(a).classList.toggle("on", true);
}

function clearPopups() {
    let popups = document.getElementsByClassName("popup");
    for(let obj of popups) {obj.classList.toggle("on", false)}
    console.log("clear popup")
}

function updateScreen() {
    switch(thisScreen) {
        case "home":
            updateHomeScreen();
            break;
        case "reminders":
            updateRemindersScreen();
            break;
        case "alarms":
            updateAlarmsScreen();
            break;
    }
}

function updateHomeScreen() {
    renderReminders(1);
    renderAlarms(1);
}

function updateRemindersScreen() {
    renderReminders(2);

    $("recent-reminders-container").innerHTML = "";
    if(data.r_reminders.length == 0) {
        let notice = document.createElement("div");
        notice.className = "content notice";
        let noticetxt = document.createElement("span");
        noticetxt.className = "noticetxt";
        noticetxt.innerHTML = "No recent reminders";
        notice.appendChild(noticetxt);
        $("recent-reminders-container").appendChild(notice);
        return;
    }
}

function updateAlarmsScreen() {
    renderAlarms(2);

    $("recent-alarms-container").innerHTML = "";
    if(data.r_alarms.length == 0) {
        let notice = document.createElement("div");
        notice.className = "content notice";
        let noticetxt = document.createElement("span");
        noticetxt.className = "noticetxt";
        noticetxt.innerHTML = "No recent reminders";
        notice.appendChild(noticetxt);
        $("recent-alarms-container").appendChild(notice);
        return;
    }
}

function createReminder() {
    let r = {
        sync: setreminder.sync,
        label: $("reminder-add-label").value,
        month: setreminder.month,
        day: setreminder.day,
        hour: setreminder.hour,
        minute: setreminder.minute,
        ampm: setreminder.ampm,
        state: 0,
        id: Math.random().toFixed(3) * 1000
    };
    data.reminders.push(r);
    if(r.sync) {
        let a = {
            sync: true,
            label: r.label,
            hour: r.hour,
            minute: r.minute,
            ampm: r.ampm,
            id: r.id
        }
        data.alarms.push(a);
    }
    clearPopups();
    updateScreen();
    console.log(r);
}

function createAlarm(a=false) {
    let r = {
        sync: a,
        label: $("alarm-add-label").value,
        hour: setalarm.hour,
        minute: setalarm.minute,
        ampm: setalarm.ampm,
        id: Math.random().toFixed(3) * 1000
    };
    data.alarms.push(r);
    clearPopups();
    updateScreen();
    console.log(r);
}

function convertTime(t) {
    return t.hour + ":" + t.minute + " " + t.ampm;
    // let z = "o";
    // if(t > 1159) {z = "p"} else {z = "a"}
    // if(t > 1259) {t -= 1200}
    // let x = t.toString();
    // if(t < 1000) {x = "0" + x}
    // let a = x.slice(0, 2);
    // let b = x.slice(2, 4);
    // return a + ":" + b + z;
}

function renderReminders(a) {
    let id = "reminders-container";
    if (a == 1) {id = "home-reminders-container"}
    $(id).innerHTML = "";

    $(id).innerHTML = "";
    for(let obj of data.reminders) { 
        let reminder = document.createElement("div");
        reminder.className = "content";
        let alarmtxt = document.createElement("span");
        alarmtxt.className = "reminder-alarmtxt";
        if(obj.sync) {
            let t = convertTime(obj);
            alarmtxt.innerHTML = "alarm: " + t;
        } else {
            console.log("here", obj.month, obj.day)
            alarmtxt.innerHTML = `due: ${obj.month} ${obj.day}`;
        }
        let desc = document.createElement("span");
        desc.className = "reminder-desc";
        desc.innerHTML = obj.label;

        let check = document.createElement("img");
        check.src = "./images/check.png";
        check.className = "icon-40";

        

        reminder.appendChild(check);
        reminder.appendChild(desc);
        reminder.appendChild(alarmtxt);

        let del = document.createElement("img");
        del.src = "./images/delete.png";
        del.className = "icon-40 delete-btn";
        del.addEventListener("click", function() {
            const index = data.reminders.findIndex(item => item.id == obj.id);
            data.reminders.splice(index, 1);
            console.log(obj);
            if(obj.sync) {
                const indexa = data.alarms.findIndex(item => item.id == obj.id);
                data.alarms.splice(index, 1);
            }
            updateScreen();
        })
        let delcontainer = document.createElement("div");
        delcontainer.className = "end-container";
        delcontainer.style.width = "59px";
        delcontainer.appendChild(del);

        reminder.appendChild(delcontainer);

        if(obj.state == 1) {
            let halo = document.createElement("img");
            halo.src = "./images/halo.png";
        }
        $(id).appendChild(reminder);
    }
}

function renderAlarms(a) {
    let id = "alarms-container";
    if (a == 1) {id = "home-alarms-container"}
    $(id).innerHTML = "";

    $(id).innerHTML = "";
    for(let obj of data.alarms) { 
        let alarm = document.createElement("div");
        alarm.className = "content alarm";
        alarm.addEventListener("click", function() {
            showPopup("alarm-edit");
            renderAlarmEdit(obj);
        })
        let time = document.createElement("span");
        time.className = "alarm-time";
        let t = convertTime(obj);
        time.innerHTML = t;
        let desc = document.createElement("span");
        desc.className = "alarm-desc";
        desc.innerHTML = obj.label;

        alarm.appendChild(time);
        alarm.appendChild(desc);
        $(id).appendChild(alarm);
    }
}

function renderAlarmEdit(d) {
    $("alarm-edit-label").value = d.label;

    const hours = Array.from($("alarm-edit-hour").querySelectorAll("div"));
    for(let obj of hours) {obj.classList.toggle("select", false)}
    const hour = Array.from($("alarm-edit-hour").querySelectorAll("div"))
    .find(el => el.textContent.trim() == d.hour);
    hour.classList.toggle("select", true);
    $("alarm-edit-hour").scrollTop = d.hour*26;

    const minutes = Array.from($("alarm-edit-minute").querySelectorAll("div"));
    for(let obj of minutes) {obj.classList.toggle("select", false)}
    const minute = Array.from($("alarm-edit-minute").querySelectorAll("div"))
    .find(el => el.textContent.trim() == d.minute);
    minute.classList.toggle("select", true);
    $("alarm-edit-minute").scrollTop = d.minute*26;

    const ampms = Array.from($("alarm-edit-ampm").querySelectorAll("div"));
    for(let obj of ampms) {obj.classList.toggle("select", false)}
    const ampm = Array.from($("alarm-edit-ampm").querySelectorAll("div"))
    .find(el => el.textContent.trim() == d.ampm);
    ampm.classList.toggle("select", true);

    const notice = Array.from($("alarm-edit").querySelectorAll("div"))
    .find(el => el.className == "content notice");
    if(notice) {console.log(notice); $("alarm-edit").removeChild(notice)}

    if(d.sync) {
        let noticebox = document.createElement("div");
        noticebox.className = "content-box";
        let notice = document.createElement("div");
        notice.className = "content notice";
        let noticetxt = document.createElement("div");
        noticetxt.className = "noticetxt";
        noticetxt.innerHTML = "*Synced with matching reminder";
        notice.appendChild(noticetxt);
        noticebox.appendChild(notice);

        $("alarm-edit").appendChild(noticebox);
    }

    editalarm = {
        hour: d.hour,
        minute: d.minute,
        ampm: d.ampm
    }

    $("alarm-edit-confirm-btn").onclick = () => {
        d.label = $("alarm-edit-label").value;
        d.hour = editalarm.hour;
        d.minute = editalarm.minute;
        d.ampm = editalarm.ampm;

        if(d.sync) {
            const index = data.reminders.findIndex(item => item.id == d.id);
            let r = data.reminders[index];
            r.label = d.label;
            r.hour = d.hour;
            r.minute = d.minute;
            r.ampm = d.ampm;
        }

        clearPopups();
        updateScreen();
    }

    $("alarm-delete-btn").onclick = () => {
        const index = data.alarms.findIndex(item => item.id == d.id);
        data.alarms.splice(index, 1);
        clearPopups();
        updateScreen();
    }
}
