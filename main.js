function $(id) {
    return document.getElementById(id);
}

let data = {
    alarms: [{label: "vocab", month: "Feb", day: 20, hour: "12", minute: "30", ampm: "AM", id: 101}],
    reminders: [{label: "vocab", month: "Feb", day: 20, hour: "12", minute: "30", ampm: "AM", id: 101, state: 0}],
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
    month: "Jan",
    day: 1,
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

    $("alarm-toggle").addEventListener("click", function() {
        let d = $("alarm-dropdown")
        if(d.classList.contains("on")) {
            d.classList.toggle("on", false)
            $("alarm-toggle-icon").src = "./images/check.png";
        
        }
        else {
            d.classList.toggle("on", true);
            $("alarm-toggle-icon").src = "./images/check-select.png";
        }
    })

    $("reminder-create-btn").addEventListener("click", function() {createReminder()});

    let months = document.getElementsByClassName("month scroll-opt");
    for(let obj of months) {obj.addEventListener("click", function() {
        for(let a of months) {a.classList.toggle("select", false)}
        obj.classList.toggle("select", true);
        setreminder.month = obj.innerHTML;
        fillDays(calender[obj.id]);
    })}

    let ampm = document.getElementsByClassName("ampm scroll-opt");
    for(let obj of ampm) { obj.addEventListener("click", function() {
        for(let a of ampm) {a.classList.toggle("select", false)}
        obj.classList.toggle("select", true);
        setreminder.ampm = obj.innerHTML;
    })}
    
    fillDays(31);

    for(let i = 1; i < 13; i++) {
        let opt = document.createElement("div");
        opt.className = "hour scroll-opt";
        opt.innerHTML = i;
        opt.addEventListener("click", function() {
            let hours = document.getElementsByClassName("hour scroll-opt");
            for(let obj of hours) {obj.classList.toggle("select", false)}
            opt.classList.toggle("select", true);
            setreminder.hour = opt.innerHTML;
        });
        $("reminder-hour").appendChild(opt);
    }
    for(let i = 0; i < 60; i++) {
        let opt = document.createElement("div");
        opt.className = "minute scroll-opt";
        opt.innerHTML = (i < 10 ? "0" : "") + i;
        opt.addEventListener("click", function() {
            let minutes = document.getElementsByClassName("minute scroll-opt");
            for(let obj of minutes) {obj.classList.toggle("select", false)}
            opt.classList.toggle("select", true);
            setreminder.minute = opt.innerHTML;
        });
        $("reminder-minute").appendChild(opt);
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
    $("home-alarms-container").innerHTML = "";

    for(let obj of data.alarms) { 
        let alarm = document.createElement("div");
        alarm.className = "content";
        let time = document.createElement("span");
        time.className = "alarm-time";
        let t = convertTime(obj);
        time.innerHTML = t;
        let desc = document.createElement("span");
        desc.className = "alarm-desc";
        desc.innerHTML = obj.label;

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
        let t = convertTime(obj);
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
        let t = convertTime(obj);
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
        let t = convertTime(obj);
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
        month: setreminder.month,
        day: setreminder.day,
        hour: setreminder.hour,
        minute: setreminder.minute,
        ampm: setreminder.ampm,
        state: 0
    };
    data.reminders.push(r);
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