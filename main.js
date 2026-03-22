function $(id) {
    return document.getElementById(id);
}

let data = {
    alarms: [{time: 2100, desc: "Study Vocab Set1,Set2,Set3", id: 1}],
    reminders: [{time: 2100, label: "Vocab", desc: "Study Vocab Set1,Set2,Set3", id: 1, state: 0}],
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

    $("alarm-toggle").addEventListener("click", function() {
        let d = $("alarm-dropdown")
        if(d.classList.contains("on")) {d.classList.toggle("on", false)}
        else {d.classList.toggle("on", true)}
    })

    $("reminder-create-btn").addEventListener("click", function() {createReminder()});
})

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
    $("home-alarms-container").innerHTML = "";

    for(let obj of data.alarms) { 
        let alarm = document.createElement("div");
        alarm.className = "content";
        let time = document.createElement("span");
        time.className = "alarm-time";
        let t = convertTime(obj.time);
        time.innerHTML = t;
        let desc = document.createElement("span");
        desc.className = "alarm-desc";
        desc.innerHTML = obj.desc;

        alarm.appendChild(time);
        alarm.appendChild(desc);
        $("home-alarms-container").appendChild(alarm);
    }

    $("home-reminders-container").innerHTML = "";

    for(let obj of data.reminders) { 
        let reminder = document.createElement("div");
        reminder.className = "content";
        let alarmtxt = document.createElement("span");
        alarmtxt.className = "reminder-alarmtxt";
        let t = convertTime(obj.time);
        alarmtxt.innerHTML = "alarm: " + t;
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
        del.className = "icon-40";
        let delcontainer = document.createElement("div");
        delcontainer.className = "end-container";
        delcontainer.style.width = "59px";
        delcontainer.appendChild(del);

        reminder.appendChild(delcontainer);

        if(obj.state == 1) {
            let halo = document.createElement("img");
            halo.src = "./images/halo.png";
        }
        $("home-reminders-container").appendChild(reminder);
    }

}

function updateRemindersScreen() {
    $("reminders-container").innerHTML = "";

    for(let obj of data.reminders) { 
        let reminder = document.createElement("div");
        reminder.className = "content";
        let alarmtxt = document.createElement("span");
        alarmtxt.className = "reminder-alarmtxt";
        let t = convertTime(obj.time);
        alarmtxt.innerHTML = "alarm: " + t;
        let desc = document.createElement("span");
        desc.className = "reminder-desc";
        desc.innerHTML = obj.desc;

        let check = document.createElement("img");
        check.src = "./images/check.png";
        check.className = "icon-40";

        

        reminder.appendChild(check);
        reminder.appendChild(desc);
        reminder.appendChild(alarmtxt);

        let del = document.createElement("img");
        del.src = "./images/delete.png";
        del.className = "icon-40";
        let delcontainer = document.createElement("div");
        delcontainer.className = "end-container";
        delcontainer.style.width = "59px";
        delcontainer.appendChild(del);

        reminder.appendChild(delcontainer);
        $("reminders-container").appendChild(reminder);
    }

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
    $("alarms-container").innerHTML = "";
    for(let obj of data.alarms) { 
        console.log("adding alarm");
        let alarm = document.createElement("div");
        alarm.className = "content";
        let time = document.createElement("span");
        time.className = "alarm-time";
        let t = convertTime(obj.time);
        time.innerHTML = t;
        let desc = document.createElement("span");
        desc.className = "alarm-desc";
        desc.innerHTML = obj.desc;

        alarm.appendChild(time);
        alarm.appendChild(desc);
        $("alarms-container").appendChild(alarm);
    }

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
        label: $("reminder-add-label").value,
        desc: $("reminder-add-desc").value,
        date: $("reminder-add-date").value,
        time: $("reminder-add-time").value,
        id: Math.random().toFixed(3)*100,
        state: 0
    };
    data.reminders.push(r);
    clearPopups();
    updateScreen();
    console.log(r);
}

function convertTime(t) {
    let z = "o";
    if(t > 1159) {z = "p"} else {z = "a"}
    if(t > 1259) {t -= 1200}
    let x = t.toString();
    if(t < 1000) {x = "0" + x}
    let a = x.slice(0, 2);
    let b = x.slice(2, 4);
    return a + ":" + b + z;
}