let counter = 0;
const weekday = {
    'Sunday' : 0,
    'Monday' : 1,
    'Tuesday' : 2,
    'Wednesday' : 3,
    'Thursday' : 4,
    'Friday' : 5,
    'Saturday' : 6
};
function offset(id) {
    let ele = document.getElementById(id);
    return ele.offsetWidth/2;
}
function toggle(element) {
    var x = document.getElementById(element);
    console.log(x);
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
}
function collide(a,acoord,b,bcoord){
    var al = acoord - (document.getElementById(a).getBoundingClientRect().width/2);
    var ar = al + (document.getElementById(a).getBoundingClientRect().width);
    var bl = bcoord - (document.getElementById(b).getBoundingClientRect().width/2);
    var br = bl + (document.getElementById(b).getBoundingClientRect().width);
    console.log('--------',al,ar,bl,br);
    if (al >= bl && al <= br){
        return true;
    }else if(ar >= bl && ar <= br){
        return true;
    }else if(bl >= al && bl <= ar){
        return true;
    }else if(br >= al && br <= ar){
        return true;
    }else{
        return false;
    }
}
const height = 200;
const zero = 0;
const sm = 20;
const ssm = 40;
const sssm = 60;
const width = 1000;
const level_1 = 230;
const level_2 = 250;
const level_3 = 270;
const level_4 = 290;
let w = document.getElementById('svg').getBoundingClientRect().width;
const indent = ((window.innerWidth-width)/2);
document.getElementById('this_hour').setAttribute('x',((width/2)-(document.getElementById('this_hour').getBoundingClientRect().width/2))+"px");
console.log(w,window.innerWidth,((window.innerWidth-w)/2));
function text(id,coord,color,opacity,y){
    var ind = coord - (document.getElementById(id).getBoundingClientRect().width/2);
    if (ind+document.getElementById(id).getBoundingClientRect().width > width){
        ind = width - document.getElementById(id).getBoundingClientRect().width;
    }else if (ind < 0){
        ind = 0;
    }
    console.log('coord '+coord);
    let op = undefined;
    if (opacity == 'in'){
        op = [0,1];
    }else if (opacity == 'out') {
        op = [1, 0];
    }
    anime({
        targets: '#'+id,
        x: [{
            value:ind
        }],
        y: [{
            value:y
        }],
        fill: [
            { value: color }
        ],
        // style: [{
        //     value: 'display: '+hide+';'
        // }],
        opacity: [{ value: opacity}],
        easing: 'easeOutQuad',
        duration: 1000,
    });
}
function anim(id,top,height,left,right,color,hide,opacity) {
    let op = undefined;
    if (opacity == 'in'){
        op = [0,1];
    }else if (opacity == 'out') {
        op = [1, 0];
    }
    anime({
        targets: id,
        d: [
            { value: 'M0 '+top+'H'+left+'V'+height+'H'+right+'V'+top+'Z'},
        ],
        fill: [
            { value: color }
        ],
        style: [{
            value: 'display: '+hide+';'
        }],
        opacity: op,
        easing: 'easeOutQuad',
        duration: 1000,
    });
}
function weekAndDay(date) {

    var days = ['Sunday','Monday','Tuesday','Wednesday',
            'Thursday','Friday','Saturday'],
        prefixes = ['First', 'Second', 'Third', 'Fourth', 'Fifth'];

    return prefixes[Math.floor(date.getDate() / 7)] + ' ' + days[date.getDay()];

}
function animate(counter) {
    console.log(counter);
    let d = new Date();
    let str = d.toLocaleString("en-IN", {timeZone: "Asia/Kolkata",hourCycle: 'h24'});
    let hour = str.split(', ')[1].split(':')[0];
    let red_left = 0;
    let red_right = 0;
    let year = d.toLocaleString("en-IN",{ year: 'numeric'});
    let ar = width - ((year-1947)*(width/1000));
    let al = ar - ((1947-1858)*(width/1000));
    let thstart = year - 1000;
    if (counter == 0){
        //a
        anim('#a',zero,height,(width/2)-(height/2),(width/2)+(height/2),'#FF0000');
        anim('#b',zero,height,0,0,'#EBE436');
        text('this_hour',width/2,'#ff0000',1,level_1);
        text('a24_hours',undefined,'#EBE436',0,level_1);

        // anime({
        //     targets: '#today',
        //     style: [{
        //         value: 'margin-left: '+((window.innerWidth/2)-(document.getElementById('today').getBoundingClientRect().width/2))+'px;'
        //     }],
        //     easing: 'easeOutQuad',
        //     duration: 1000,
        // });
        // anime({
        //     targets: '#a1',
        //     opacity: [1,1],
        //     translateX: [(width/2)-offset('a1')],
        //     easing: 'easeOutQuad',
        //     duration: 1000,
        // });
        // anime({
        //     targets: '#a1',
        //     opacity: [0,1],
        //     easing: 'easeOutQuad',
        //     duration: 1000,
        // });
    }
    if (counter == 1){
        //a,b
        console.log(d);
        hour = hour%24;
        red_left = (width/24)*hour;
        red_right = red_left + (width/24);
        anim('#a',sm,height,red_left,red_right,'#FF0000');
        anim('#b',zero,height,0,width,'#EBE436');
        anim('#c',zero,height,0,0,'#EBE436');
        console.log('Hour',hour);
        text('this_hour',((red_left+red_right)/2),'#ff0000',1,level_1);

        text('this_week',undefined,'#EBE436',0,level_1);
        if (hour < 2){
            text('a24_hours',width,'#EBE436',1,level_1);
        }else {
            text('a24_hours',undefined,'#EBE436',1,level_1);
        }
        // anime({
        //     targets: '#today',
        //     style: [{
        //         value: 'margin-left: '+(indent+((red_left+red_right)/2))+'px;'
        //     }],
        //     easing: 'easeOutQuad',
        //     duration: 1000,
        // });
        // anime({
        //     targets: '#a1',
        //     opacity: [1,0],
        //     easing: 'easeOutQuad',
        //     duration: 1000,
        // });
        console.log(((red_left+red_right)/2),red_left);
    }
    if (counter == 2){
        //a,b,c
        hour = hour%24;
        let day = weekday[d.toLocaleString("en-IN",{ weekday: 'long'})];
        let bl = ((width/7)*day);
        let br = bl + (width/7);
        let al = bl + (((br-bl)/24)*hour);
        let ar = al + ((br-bl)/24);
        anim('#a',ssm,height,al,ar,'#FF0000');
        anim('#b',sm,height,bl,br,'#00A3D5');
        anim('#c',zero,height,0,width,'#EBE436');
        anim('#d',zero,height,0,0,undefined,'none');
        anim('#e',zero,height,0,0);
        text('this_month',0,'#53AD54',0,level_1);

        text('a24_hours',bl,'#00A3D5',1);
        text('this_year',0,'#EBE436',0,level_1);
        if(day == 0){
            text('this_week',width,'#EBE436',1,level_1);
        }else{
            text('this_week',undefined,'#EBE436',1,level_1);
        }
        if (collide('this_hour',((al+ar)/2),'a24_hours',bl)){
            text('this_hour',al,'#ff0000',1,level_2);
        }else{
            text('this_hour',al,'#ff0000',1,level_1);
        }
    }
    if (counter == 3){
        let day = weekday[d.toLocaleString("en-IN",{ weekday: 'long'})];
        let mon = d.toLocaleString("en-IN",{ month: 'numeric'});
        const dayOfYear = date =>
            Math.floor((date - new Date(date.getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24);
        console.log( weekAndDay(d));
        console.log(d.toLocaleString("en-IN",{ month: 'numeric'}));
        console.log(dayOfYear(new Date()))
        console.log(new Date(2021,2,0).getDate())
        console.log(new Date(2021,1,1))
        let monthStart = dayOfYear(new Date(2021,mon-1,1));
        console.log('Monthstart', monthStart);
        let date = new Date();
        date.setDate(date.getDate() - day);
        let weekstart = dayOfYear(date)
        let monthdays = new Date(year,mon,0).getDate();
            let days = 365;
        if (year % 4 == 0){
            days = 366;
        }
        let dl = (width/days)*(monthStart-1);
        let dr = dl + ((width/days)*monthdays);
        let cl = (width/days)*weekstart;
        let cr = cl + ((width/days)*7)
        let cm = (cl+cr)/2;

        anim('#e',zero,height,0,width,'#EBE436');
        anim('#d',sm,height,dl,dr,'#53AD54');
        anim('#c',ssm,height,cl,cr,'#FF0000');
        anim('#b',ssm,height,cm,cm,'#00A3D5');
        anim('#a',ssm,height,cm,cm);
        anim('#f',zero,height,0,0);
        text('this_hour',((cl+cr)/2),'#ff0000',0);
        text('a24_hours',((cl+cr)/2),'#00A3D5',0);
        text('this_month',((dl+dr)/2),'#53AD54',1,level_1);
        text('this_week',((cl+cr)/2),'#FF0000',1,level_2);
        text('century21',width,'#EBE436',0,level_1);

        if (monthStart == 1){
            text('this_year',width,'#EBE436',1,level_1);
        }else{
            text('this_year',0,'#EBE436',1,level_1);
        }
    }
    if (counter == 4){
        let el = (width/100) * ((year-1)%1000);
        let er = el + (width/100);
        let em = (el+er)/2;
        anim('#e',sm,height,el,er,'#53AD54');
        anim('#d',sm,height,em,em,'#53AD54');
        anim('#c',ssm,height,em,em,'#FF0000');
        anim('#f',zero,height,0,width,'#EBE436');
        anim('#g',zero,height,0,0,'#00A3D5');
        anim('#h',zero,height,0,0,'#EBE436');
        text('century21',width,'#EBE436',1,level_1);
        text('this_year',em,'#53AD54',1,level_1);
        text('this_month',em,'#53AD54',0,level_1);
        text('this_week',em,'#FF0000',0,level_2);
        text('century20',0,'#00A3D5',0,level_1);
        text('years1000',0,'#EBE436',0,level_1);
    }
    if (counter == 5){
        let span = year-2000;
        let fl = width - (span*(width/1000));
        let gl = fl - (width/10);
        anim('#f',sm,height,fl,width,'#FF0000');
        anim('#e',ssm,height,width,width,'#53AD54');
        anim('#g',sm,height,gl,fl,'#00A3D5');
        anim('#h',zero,height,0,width,'#EBE436');
        anim('#a',zero,height,0,0,'#603A8E');
        text('this_year',width,'#53AD54',0,level_1);
        text('century21',width,'#FF0000',1,level_2);
        text('century20',((gl+fl)/2),'#00A3D5',1,level_1);
        text('years1000',0,'#EBE436',1,level_1);
        text('british_raj',0,'#603A8E',0,level_2);
        text('british_raj_year',0,'#603A8E',0,level_3);
    }
    if (counter == 6){
        let span = year-2000;
        let fl = width - (span*(width/1000));
        let gl = fl - (width/10);
        anim('#a',ssm,height,al,ar+1,'#603A8E');
        anim('#b',zero,height,0,0,'#16215D');
        text('british_raj',((al+ar)/2),'#603A8E',1,level_1);
        text('british_raj_year',((al+ar)/2),'#603A8E',1,level_2);
        text('century20',((gl+fl)/2),'#00A3D5',1,level_3);
        text('century21',width,'#FF0000',1,level_4);
        text('company_raj',0,'#16215D',0,level_1);
        text('company_raj_year',0,'#16215D',0,level_2);
    }
    if (counter == 7){
        let bl = al - ((1858-1757)*(width/1000));
        anim('#b',ssm,height,bl,al+1,'#16215D');
        anim('#c',zero,height,0,0,'#DE5F21');
        anim('#d',zero,height,0,0,'#EB5263');
        text('company_raj',((bl+al)/2),'#16215D',1,level_1);
        text('company_raj_year',((bl+al)/2),'#16215D',1,level_2);
        text('mughal_empire_i',0,'#EB5263',0,level_1);
        text('mughal_empire_i_year',0,'#EB5263',0,level_2);
        text('mughal_empire_ii',0,'#DE5F21',0,level_1);
        text('mughal_empire_ii_year',0,'#DE5F21',0,level_2);
    }
    if (counter == 8){
        let bl = al - ((1858-1757)*(width/1000));
        anim('#c',sm,height,((width/1000)*(1555-thstart)),((width/1000)*(1857-thstart)),'#DE5F21');
        anim('#d',sm,height,((width/1000)*(1526-thstart)),((width/1000)*(1540-thstart)),'#EB5263');
        anim('#e',zero,height,0,0,'#53AD54');
        text('mughal_empire_ii',((bl+((width/1000)*(1540-thstart))+(document.getElementById("mughal_empire_ii").getBoundingClientRect().width/2))/2),'#DE5F21',1,level_1);
        text('mughal_empire_ii_year',((bl+((width/1000)*(1540-thstart))+(document.getElementById("mughal_empire_ii").getBoundingClientRect().width/2))/2),'#DE5F21',1,level_2);
        text('mughal_empire_i',((width/1000)*(1540-thstart)),'#EB5263',1,level_1);
        text('mughal_empire_i_year',((width/1000)*(1540-thstart)),'#EB5263',1,level_2);
        text('delhi_sultanate',0,'#53AD54',0,level_1);
        text('delhi_sultanate_year',0,'#53AD54',0,level_2);
    }
    if (counter == 9){
        let bl = al - ((1858-1757)*(width/1000));
        let span = year-2000;
        let fl = width - (span*(width/1000));
        let gl = fl - (width/10);
        anim('#e',sm,height,(width/1000)*(1206-thstart),((width/1000)*(1526-thstart))+1,'#53AD54');
        anim('#f',sm,height,width - ((year-2000)*(width/1000)),width,'#FF0000');
        anim('#g',sm,height,((1900-thstart)*(width/1000)),((2000-thstart)*(width/1000)),'#00A3D5');
        anim('#j',sm,height,(width/1000)*(1206-thstart),((width/1000)*(1947-thstart))+1,'#603A8E','none');
        anim('#a',ssm,height,al,ar+1,'#603A8E');
        anim('#b',ssm,height,al - ((1858-1757)*(width/1000)),al+1,'#16215D');
        anim('#c',sm,height,(width/1000)*(1555-thstart),(width/1000)*(1857-thstart),'#DE5F21');
        anim('#d',sm,height,(width/1000)*(1526-thstart),(width/1000)*(1540-thstart),'#EB5263');
        anim('#e',sm,height,(width/1000)*(1206-thstart),((width/1000)*(1526-thstart))+1,'#53AD54');
        text('mughal_empire_ii',((bl+((width/1000)*(1540-thstart))+(document.getElementById("mughal_empire_ii").getBoundingClientRect().width/2))/2),'#DE5F21',1,level_1);
        text('mughal_empire_ii_year',((bl+((width/1000)*(1540-thstart))+(document.getElementById("mughal_empire_ii").getBoundingClientRect().width/2))/2),'#DE5F21',1,level_2);
        text('mughal_empire_i',((width/1000)*(1540-thstart)),'#EB5263',1,level_1);
        text('mughal_empire_i_year',((width/1000)*(1540-thstart)),'#EB5263',1,level_2);
        text('delhi_sultanate',(((width/1000)*(1206-thstart)+((width/1000)*(1526-thstart)))/2),'#53AD54',1,level_1);
        text('delhi_sultanate_year',(((width/1000)*(1206-thstart)+((width/1000)*(1526-thstart)))/2),'#53AD54',1,level_2);
        text('century20',((gl+fl)/2),'#00A3D5',1,level_3);
        text('company_raj',((bl+al)/2),'#16215D',1,level_1);
        text('company_raj_year',((bl+al)/2),'#16215D',1,level_2);
        text('british_raj',((al+ar)/2),'#603A8E',1,level_1);
        text('british_raj_year',((al+ar)/2),'#603A8E',1,level_2);
        text('maratha_empire',0,'#603A8E',0,level_1);
        text('maratha_empire_year',0,'#603A8E',0,level_2);
    }
    if (counter == 10){
        let c = (((width/year)*(1647))+((width/year)*(1818)))/2;
        anim('#j',sm,height,(width/year)*(1647),((width/year)*(1818))+1,'#603A8E');
        anim('#f',sm,height,width - ((year-2000)*(width/year)),width,'#FF0000');
        anim('#g',sm,height,((1900)*(width/year)),((2000)*(width/year)),'#00A3D5');
        anim('#a',ssm,height,c,c,'#603A8E');
        anim('#b',ssm,height,c,c,'#16215D');
        anim('#c',ssm,height,c,c,'#DE5F21');
        anim('#d',ssm,height,c,c,'#EB5263');
        anim('#e',ssm,height,c,c,'#53AD54');
        anim('#k',zero,height,0,0,'#1C37C7');
        text('century20',((1900)*(width/year)),'#00A3D5',1,level_3);
        text('delhi_sultanate',c,'#53AD54',0,level_1);
        text('delhi_sultanate_year',c,'#53AD54',0,level_2);
        text('maratha_empire',c,'#603A8E',1,level_1);
        text('maratha_empire_year',c,'#603A8E',1,level_2);
        text('mughal_empire_ii',c,'#DE5F21',0,level_1);
        text('mughal_empire_ii_year',c,'#DE5F21',0,level_2);
        text('mughal_empire_i',c,'#EB5263',0,level_1);
        text('mughal_empire_i_year',c,'#EB5263',0,level_2);
        text('company_raj',c,'#16215D',0,level_1);
        text('company_raj_year',c,'#16215D',0,level_2);
        text('british_raj',c,'#603A8E',0,level_1);
        text('british_raj_year',c,'#603A8E',0,level_2);
    }
    if (counter == 11){
        anim('#k',sm,height,((1206)*(width/year)),((1526)*(width/year)),'#1C37C7');
        anim('#a',zero,height,0,0,'#0B0F22');
        text('delhi_sultanate',((((1206)*(width/year))+((1526)*(width/year)))/2),'#1C37C7',1,level_1);
        text('delhi_sultanate_year',((((1206)*(width/year))+((1526)*(width/year)))/2),'#1C37C7',1,level_2);
        text('hoysala',0,'#0B0F22',0,level_3);
        text('hoysala_year',0,'#0B0F22',0,level_4);
    }
    if (counter == 12){
        anim('#a',ssm,height,((1206)*(width/year)),((1526)*(width/year)),'#0B0F22');
        anim('#k',sm,height,((1206)*(width/year)),((1526)*(width/year)),'#1C37C7');
        anim('#b',zero,height,0,0,'#DE5F21');
        text('hoysala',((((1206)*(width/year))+((1526)*(width/year)))/2),'#0B0F22',1,level_3);
        text('hoysala_year',((((1206)*(width/year))+((1526)*(width/year)))/2),'#0B0F22',1,level_4);
    }
    if (counter == 13){
        anim('#b',sm,height,((848)*(width/year)),((1279)*(width/year)),'#DE5F21');
        anim('#a',sssm,height,((1206)*(width/year)),((1526)*(width/year)),'#0B0F22');
        anim('#k',ssm,height,((1206)*(width/year)),((1526)*(width/year)),'#1C37C7');
        anim('#d',zero,height,0,0,'#53AD54');
    }
    if (counter == 14){
        anim('#d',sm,height,((200)*(width/year)),((550)*(width/year)),'#53AD54');
        anim('#c',zero,height,0,0,'#EA5263');
    }
    if (counter == 15){
        anim('#c',ssm,height,((250)*(width/year)),((500)*(width/year)),'#ea5263');
    }
}
let button = document.getElementById('next');
button.addEventListener('click',() => {
    counter += 1;
    animate(counter);
});
document.getElementById('a').setAttribute('d','M0 '+zero+'H'+((width/2)-(height/2))+'V'+height+'H'+((width/2)+(height/2))+'V'+zero+'Z');

// document.getElementById('text').setAttribute('style','align-items: center;display: flex;height: 10vh;margin-left: '+((window.innerWidth-w)/2)+'px;margin-right: '+((window.innerWidth-w)/2)+'px;');
// document.getElementById('a1').setAttribute('style','translate: transformX('+((width/2)-offset('a1'))+');');
let button1 = document.getElementById('back');
button1.addEventListener('click',() => {
    if (counter != 0){
        counter -= 1;
    }
    animate(counter);
});