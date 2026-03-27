function $(id) {
    return document.getElementById(id);
}

let data = {
    tasks: [{label: "Example Task 1", month: 3, day: 26, hour: "12", minute: "30", ampm: "AM", snooze: 9, id: 101, state: 0, sync: false}],
    r_tasks: []
}

let thisScreen = "home";

const screens = {
    "home" : 0,
    "tasks" : -402,
    "settings" : -804,
    "user" : -1206,
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

const calender2 = [
    31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31
]

const year = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
]

let settask = {
    month: "Jan",
    day: 1,
    hour: 1,
    minute: 1,
    ampm: "AM",
    snooze: 9
}
let setalarm = {
    hour: 1,
    minute: 1,
    ampm: "AM"
}

let edittask = {
    month: "Jan",
    day: 1,
    hour: 1,
    minute: 1,
    ampm: "AM",
    snooze: 9
}

document.addEventListener("DOMContentLoaded", function() {
    updateHomeScreen();
    getTime();
    $("home-btn").addEventListener("click", function() {goScreen("home")})
    $("tasks-btn").addEventListener("click", function() {goScreen("tasks")})
    $("settings-btn").addEventListener("click", function() {goScreen("settings")})
    $("user-btn").addEventListener("click", function() {goScreen("user")})

    $("general-btn").addEventListener("click", function() {showPopup("settings-general")});
    let backbtns = document.getElementsByClassName("back-btn");
    for(let obj of backbtns) {obj.addEventListener("click", function() {clearPopups()})}

    $("add-task-btn").addEventListener("click", function() {showPopup("tasks-add")});

    $("task-create-btn").addEventListener("click", function() {createtask()});

    $("clear-btn").addEventListener("click", function() {
        data.r_tasks = [];
        updateScreen();
    })

    let months = document.getElementsByClassName("month scroll-opt");
    for(let obj of months) {obj.addEventListener("click", function() {
        for(let a of months) {a.classList.toggle("select", false)}
        obj.classList.toggle("select", true);
        settask.month = obj.innerHTML;
        fillDays(calender[obj.id]);
    })}

    let ampm = document.getElementsByClassName("ampm scroll-opt");
    for(let obj of ampm) {obj.addEventListener("click", function() {
        for(let a of ampm) {a.classList.toggle("select", false)}
        obj.classList.toggle("select", true);
        settask.ampm = obj.innerHTML;
        edittask.ampm = obj.innerHTML;
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
            settask.hour = this.innerHTML;
            edittask.hour = this.innerHTML;
        };
        opt.addEventListener("click", hourClick);
        const opt2 = opt.cloneNode(true);
        opt2.addEventListener("click", hourClick);
        $("task-hour").appendChild(opt);
        $("edit-hour").appendChild(opt2);
        console.log(i);
    }
    for(let i = 0; i < 60; i++) {
        let opt = document.createElement("div");
        opt.className = "minute scroll-opt";
        opt.innerHTML = (i < 10 ? "0" : "") + i;
        function minuteClick() {
            let minutes = document.getElementsByClassName("minute scroll-opt");
            for(let obj of minutes) {obj.classList.toggle("select", false)}
            this.classList.toggle("select", true);
            settask.minute = this.innerHTML;
            edittask.minute = this.innerHTML;
        };
        opt.addEventListener("click", minuteClick);
        const opt2 = opt.cloneNode(true);
        opt2.addEventListener("click", minuteClick);
        $("task-minute").appendChild(opt);
        $("edit-minute").appendChild(opt2);
    }
    for(let i = 1; i < 16; i++) {
        let opt = document.createElement("div");
        opt.className = "snooze scroll-opt";
        opt.innerHTML = i;
        function snoozeClick() {
            let snoozes = document.getElementsByClassName("snooze scroll-opt");
            for(let obj of snoozes) {obj.classList.toggle("select", false)}
            this.classList.toggle("select", true);
            settask.snooze = this.innerHTML;
            edittask.snooze = this.innerHTML;
        }
        opt.addEventListener("click", snoozeClick);
        const opt2 = opt.cloneNode(true);
        opt2.addEventListener("click", snoozeClick);
        $("task-snooze").appendChild(opt);
        $("edit-snooze").appendChild(opt2);
    }
})

function fillDays(n) {
    $("task-day").innerHTML = "";
    for(let i = 1; i < n+1; i++) {
        let opt = document.createElement("div");
        opt.className = "day scroll-opt";
        opt.innerHTML = i;
        function dayClick() {
            let days = document.getElementsByClassName("day scroll-opt");
            for(let obj of days) {obj.classList.toggle("select", false)}
            this.classList.toggle("select", true);
            settask.day = this.innerHTML;
            edittask.day = this.innerHTML;
        }
        opt.addEventListener("click", dayClick);
        const opt2 = opt.cloneNode(true);
        opt2.addEventListener("click", dayClick);
        $("task-day").appendChild(opt);
        $("edit-day").appendChild(opt2);
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
    $("tasks-icon").src = "./images/tasks.png";
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
    getTime();
    switch(thisScreen) {
        case "home":
            updateHomeScreen();
            break;
        case "tasks":
            updateTasksScreen();
            break;
        case "alarms":
            updateAlarmsScreen();
            break;
    }
}

function updateHomeScreen() {
    
    $("upnext-container").innerHTML = "";
    //Find next task
    let times = [];
    let dates = [];
    for(let obj of data.tasks) {
        times.push([getNumTime(obj), obj]);
        dates.push([getNumDate(obj), obj]);
    }
    times.sort(function(a, b) {
        return a[0] - b[0];
    });
    if(times.length > 0) {
        console.log("here");
        let next = times[0][1];
        $("upnext-container").appendChild(renderTask(next, true));
        console.log(next);
        $("snooze-txt").innerHTML = `Snooze: +${next.snooze}min`;
        $("snooze-btn").onclick = function() {
            let m = Number(next.minute);
            let s = Number(next.snooze);
            next.minute = m + s;
            if(next.minute > 59) {
                next.minute -= 60;
                let h = Number(next.hour);
                next.hour = h + 1;
                if(next.hour > 12) {
                    next.hour -= 12;
                    if(next.ampm == "AM") {next.ampm = "PM"} else
                    if(next.ampm == "PM") {
                        next.ampm = "AM";
                        next.day ++;
                        if(next.day > calender2[next.month-1]) {
                            next.day = 1;
                            next.month ++;
                            if(next.month > 12) {
                                next.month = 1;
                            }
                        }
                    }
                }
            }
            updateScreen();
        }
    } else {
        let notice = document.createElement("div");
        notice.className = "content notice";
        let noticetxt = document.createElement("span");
        noticetxt.className = "noticetxt";
        noticetxt.innerHTML = "No Tasks Currently";
        notice.appendChild(noticetxt);
        $("upnext-container").appendChild(notice);
        $("snooze-txt").innerHTML = `Snooze: None`;
        $("snooze-btn").onclick = function() {
            //
        }
    }

    //For Today
    $("fortoday-container").innerHTML = "";
    let day = getDay();
    console.log(dates);
    let today = dates.filter(item => item[0].month === day.month);
    console.log(dates);
    console.log(today);
    for(let obj of today) {$("fortoday-container").appendChild(renderTask(obj[1], false, true))}
    if(today.length == 0) {
        let notice = document.createElement("div");
        notice.className = "content notice";
        let noticetxt = document.createElement("span");
        noticetxt.className = "noticetxt";
        noticetxt.innerHTML = "No Tasks Currently";
        notice.appendChild(noticetxt);
        $("fortoday-container").appendChild(notice);
    }
}

function getTime() {
    let now = new Date();

    let hours = now.getHours();
    let ampm = (hours > 12 ? "pm" : "am");
    hours = hours % 12;
    let minutes = now.getMinutes();

    let time = `${hours}:${minutes < 10 ? "0": ""}${minutes}${ampm}`
    $("time").innerHTML = time;
    return time;
}

function getNumDate(a) {
    return {
        month: a.month,
        day: a.day
    }
}
 
function getDay() {
    let now = new Date()
    const date = {
        month: now.getMonth() + 1,
        day: now.getDate()
    }
    console.log(date);
    return date;
}

function getNumTime(a) {
    let t = "" + (a.hour + (a.ampm == "PM" ? 12 : 0)) + a.minute;
    return t;
}
function renderTask(a, b=false, c=false) {
    let task = document.createElement("div");
    task.className = "content";
    task.addEventListener("click", function() {
        showPopup("task-edit");
        renderEdit(a);
    })
    let alarmtxt = document.createElement("span");
    alarmtxt.className = "task-alarmtxt";
    let t = b || c ? convertTime(a) : `${a.month} ${a.day}`;
    alarmtxt.innerHTML = (b ? "upcoming:      " : c ? "alarm: " : "due: ") + t;
    let desc = document.createElement("span");
    desc.className = "task-desc";
    desc.innerHTML = a.label;

    let check = document.createElement("img");
    check.src = "./images/check.png";
    check.className = "icon-40";

    task.appendChild(check);
    task.appendChild(desc);
    task.appendChild(alarmtxt);

    let del = document.createElement("img");
    del.src = "./images/delete.png";
    del.className = "icon-40 delete-btn";
    del.addEventListener("click", function(event) {
        event.stopPropagation();
        const index = data.tasks.findIndex(item => item.id == a.id);
        data.r_tasks.push(data.tasks[index]);
        data.tasks.splice(index, 1);
        updateScreen();
    })
    let delcontainer = document.createElement("div");
    delcontainer.className = "end-container";
    delcontainer.style.width = "59px";
    delcontainer.appendChild(del);

    task.appendChild(delcontainer);

    if(a.state == 1) {
        let halo = document.createElement("img");
        halo.src = "./images/halo.png";
    }
    return task;
    
}

function renderRecent(a) {
    let task = document.createElement("div");
    task.className = "content";
    let desc = document.createElement("span");
    desc.className = "task-desc";
    desc.innerHTML = a.label;
    desc.style.width = "150px"
    let alarmtxt = document.createElement("span");
    alarmtxt.className = "task-alarmtxt recent";
    alarmtxt.innerHTML = `date: ${a.month}, ${a.day} / alarm: ${a.hour}:${a.minute < 10 ? " " : ""}${a.minute}${a.ampm}`;
    let add = document.createElement("img");
    add.src = "./images/add.png";
    add.addEventListener("click", function(event) {
        event.stopPropagation();
        const index = data.r_tasks.findIndex(item => item.id == a.id);
        data.tasks.push(a);
        data.r_tasks.splice(index, 1);
        updateScreen();
    })
    let end = document.createElement("div");
    end.className = "end-container";
    end.style.width = "54px";
    end.appendChild(add);

    task.appendChild(desc);
    task.appendChild(alarmtxt);
    task.appendChild(end);
    return task;
}

function updateTasksScreen() {
    $("tasks-container").innerHTML = "";
    for(let obj of data.tasks) {$("tasks-container").appendChild(renderTask(obj))}

    $("recent-tasks-container").innerHTML = "";
    if(data.r_tasks.length == 0) {
        let notice = document.createElement("div");
        notice.className = "content notice";
        let noticetxt = document.createElement("span");
        noticetxt.className = "noticetxt";
        noticetxt.innerHTML = "No recent tasks";
        notice.appendChild(noticetxt);
        $("recent-tasks-container").appendChild(notice);
        return;
    } else {
        for(let obj of data.r_tasks) {$("recent-tasks-container").appendChild(renderRecent(obj))}
    }
}

function createtask() {
    let r = {
        label: $("task-add-label").value,
        month: settask.month,
        day: settask.day,
        hour: settask.hour,
        minute: settask.minute,
        ampm: settask.ampm,
        state: 0,
        id: Math.random().toFixed(3) * 1000,
        snooze: settask.snooze
    };
    data.tasks.push(r);
    clearPopups();
    updateScreen();
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

function renderEdit(d) {
    $("edit-label").value = d.label;

    const months = Array.from($("edit-month").querySelectorAll("div"));
    for(let obj of months) {obj.classList.toggle("select", false)}
    const month = Array.from($("edit-month").querySelectorAll("div"))
    .find(el => year.indexOf(el.textContent.trim())+1 == d.month);
    month.classList.toggle("select", true);
    $("edit-month").scrollTop = (d.month-1)*26;
    
    const days = Array.from($("edit-day").querySelectorAll("div"));
    for(let obj of days) {obj.classList.toggle("select", false)}
    const day = Array.from($("edit-day").querySelectorAll("div"))
    .find(el => el.textContent.trim() == d.day);
    day.classList.toggle("select", true);
    $("edit-day").scrollTop = (d.day-1)*26;

    const snoozes = Array.from($("edit-snooze").querySelectorAll("div"));
    for(let obj of snoozes) {obj.classList.toggle("select", false)}
    const snooze = Array.from($("edit-snooze").querySelectorAll("div"))
    .find(el => el.textContent.trim() == d.snooze);
    snooze.classList.toggle("select", true);
    $("edit-snooze").scrollTop = (d.snooze-1)*26;

    const hours = Array.from($("edit-hour").querySelectorAll("div"));
    for(let obj of hours) {obj.classList.toggle("select", false)}
    const hour = Array.from($("edit-hour").querySelectorAll("div"))
    .find(el => el.textContent.trim() == d.hour);
    hour.classList.toggle("select", true);
    $("edit-hour").scrollTop = d.hour*26;

    const minutes = Array.from($("edit-minute").querySelectorAll("div"));
    for(let obj of minutes) {obj.classList.toggle("select", false)}
    const minute = Array.from($("edit-minute").querySelectorAll("div"))
    .find(el => el.textContent.trim() == d.minute);
    minute.classList.toggle("select", true);
    $("edit-minute").scrollTop = d.minute*26;

    const ampms = Array.from($("edit-ampm").querySelectorAll("div"));
    for(let obj of ampms) {obj.classList.toggle("select", false)}
    const ampm = Array.from($("edit-ampm").querySelectorAll("div"))
    .find(el => el.textContent.trim() == d.ampm);
    ampm.classList.toggle("select", true);

    edittask = {
        month: d.month,
        day: d.day,
        hour: d.hour,
        minute: d.minute,
        ampm: d.ampm,
        snooze: d.snooze
    }

    $("edit-confirm-btn").onclick = () => {
        d.month = edittask.month;
        d.day = edittask.day;
        d.label = $("edit-label").value;
        d.hour = edittask.hour;
        d.minute = edittask.minute;
        d.ampm = edittask.ampm;
        d.snooze = edittask.snooze;

        clearPopups();
        updateScreen();
    }

    $("delete-btn").onclick = () => {
        const index = data.tasks.findIndex(item => item.id == d.id);
        data.tasks.splice(index, 1);
        clearPopups();
        updateScreen();
    }
}
