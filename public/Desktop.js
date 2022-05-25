
// // Chat functions
// let TabShow = false;
// function openChat() {
//     let Tab = document.getElementById('tab-chat');    // On click open tab
//     console.log(Tab);
//     if (TabShow === false) {
//         Tab.style.display = 'flex';
//         TabShow = true;
//     }
//     else {
//         Tab.style.display = 'none';
//         TabShow = false;
//     }
// }
// $( function() {
//     $( "#tab-chat" ).draggable({ containment: "window" });   // Draggable tab
//   } );

// const { Tab } = require("bootstrap");

//   document.getElementById('mini').addEventListener('click',function(){
//     TabShow= true;
//     openChat();
//   })
//   // document.getElementById('cut').addEventListener('click',function(){
//   //   TabShow= true;
//   //   openChat();
//   // })

//   let Tab = document.getElementById('tab-chat');
//   let max=true;
//   document.getElementById('max').addEventListener('click',function(){
//       if(max===true){
//       Tab.style.height="100%";
//       Tab.style.width="100%";
//       document.getElementById('max').src="../image/icon/mini.png";
//       console.log(max);
//       max=false;
//       }
//       else{
//           Tab.style.height="70vh";
//           Tab.style.width="70vw";
//           document.getElementById('max').src="../image/icon/maximize.png";
//           max=true;
//       }
//   })

//   Browser function

// let TabShow1 = false;
// function openbrowser() {
//     let Tab = document.getElementById('tab-browser');    // On click open tab
//     console.log(Tab);
//     if (TabShow1 === false) {
//         Tab.style.display = 'flex';
//         TabShow1 = true;
//     }
//     else {
//         Tab.style.display = 'none';
//         TabShow1 = false;
//     }
// }
// $( function() {
//     $( "#tab-browser" ).draggable({ containment: "window" });   // Draggable tab
//   } );

//   document.getElementById('mini').addEventListener('click',function(){
//     TabShow1= true;
//     openbrowser();
//   })
//   // document.getElementById('cut').addEventListener('click',function(){
//   //   TabShow1= true;
//   //   openbrowser();
//   // })

//   let Tab1 = document.getElementById('tab-browser');

// function openChat() {
//     window.open("../Desktop.hbs", "_blank", "width=600,height=500,top=150,left=450,titlebar=0,fullscreen=0");
// }

function fullscreen() {
    var element = getElementById("max");
    element.style.width = "100%";
    element.style.height = "100%"
}
// Clock

setTimeout(function () {
    setInterval(function () {
        var hours = new Date().getHours();
        var merid;
        if (hours > 12) {
            hours = hours - 12;
            merid = 'PM';
        } else {
            merid = 'AM';
        }

        var minutes = new Date().getMinutes();
        // Add a leading zero to the minutes value
        minutes = (minutes < 10 ? '0' : '') + minutes;

        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth() + 1; //January is 0!

        var yyyy = today.getFullYear();
        var today = mm + '/' + dd + '/' + yyyy;

        $('.clock').html(hours + ':' + minutes + ' ' + merid + '<br>' + today);
    }, 1000);
}, 1000);

//Full Screen

function toggleFullScreen() {
    if ((document.fullScreenElement && document.fullScreenElement !== null) ||
        (!document.mozFullScreen && !document.webkitIsFullScreen)) {
        if (document.documentElement.requestFullScreen) {
            document.documentElement.requestFullScreen();
        } else if (document.documentElement.mozRequestFullScreen) {
            document.documentElement.mozRequestFullScreen();
        } else if (document.documentElement.webkitRequestFullScreen) {
            document.documentElement.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
        }
    } else {
        if (document.cancelFullScreen) {
            document.cancelFullScreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.webkitCancelFullScreen) {
            document.webkitCancelFullScreen();
        }
    }
}

//Backgroung- change
var tab = document.getElementById('tab-form');
if (tab.addEventListener) {
    tab.addEventListener(
        'contextmenu',
        function (e) {
            $('#body-rmenu').toggleClass('hide');
            $('#body-rmenu').css({
                position: 'absolute',
                top: e.pageY,
                left: e.pageX
            });
            //alert('Worked');
            e.preventDefault();
        },
        false
    );
}

// this is from another SO post...
$(document).on('click', function (event) {
    document.getElementById('body-rmenu').className = 'hide';
});

function changeBg(number) {
    // Check browser support of LocalStorage
    if (typeof Storage !== 'undefined') {
        // Store
        localStorage.setItem('wp', number);
        $('#body').css(
            'background-image',
            'url(../image/' + number + '.jpg)'
        );
    } else {
        $('#body').css(
            'background-image',
            'url(../image/' + number + '.jpg)'
        );
    }
};

dragElement(
    document.getElementById('tab-chat'),
    document.getElementById('tab-header')
);
dragElement(
    document.getElementById('tab-file'),
    document.getElementById('tab-header-file')
);
dragElement(
    document.getElementById('tab-browser'),
    document.getElementById('tab-header-browser')
);

function dragElement(elmnt, eH) {
    var pos1 = 0,
        pos2 = 0,
        pos3 = 0,
        pos4 = 0;
    eH.onmousedown = dragMouseDown;

    function dragMouseDown(e) {
        e = e || window.event;
        // get the mouse cursor position at startup:
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        // call a function whenever the cursor moves:
        document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
        e = e || window.event;
        // calculate the new cursor position:
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        // set the element's new position:
        elmnt.style.top = elmnt.offsetTop - pos2 + 'px';
        elmnt.style.left = elmnt.offsetLeft - pos1 + 'px';
    }

    function closeDragElement() {
        /* stop moving when mouse button is released:*/
        document.onmouseup = null;
        document.onmousemove = null;
    }
}



