(function ($) {
  var o = $({});

  $.each(
    {
      trigger: 'publish',
      on: 'subscribe',
      off: 'unsubscribe',
    },
    function (key, val) {
      jQuery[val] = function () {
        o[key].apply(o, arguments);
      };
    }
  );
})(jQuery);

let rose = {
  initListeners: function () {
    $.subscribe('JackToRose', function () {
      console.group('Jack to Rose');
      console.log(
        'Message > Jack to Rose: This is Jack. I love you and want to be with you, Rose!'
      );
      console.groupEnd();
      $.publish('RoseToJack');
      $.publish('RoseToBilly');
    }),
      $.subscribe('BillyToRose', function () {
        console.group('Billy to Rose');
        console.log(
          'Message > Billy to Rose: This is Billy. Goodbye, my love, goodbye! I will not bother you'
        );
        console.groupEnd();
      });
  },
};

let jack = {
  message: 'JackToRose',
  notify: function () {
    $.publish(this.message);
  },
  initListeners: function () {
    $.subscribe('RoseToJack', function () {
      console.group('Rose to Jack');
      console.log('Message > Rose to Jack: This is Rose. I love you too, Jack!');
      console.groupEnd();
    });
  },
};

let billy = {
  initListeners: function () {
    $.subscribe('RoseToBilly', function () {
      console.group('Rose to Billy');
      console.log('Message > Rose to Billy: This is Rose. Jask loves me. Run, Billy!');
      console.groupEnd();
      $.publish('BillyToRose');
    });
  },
};

$('button').on('click', function () {
  rose.initListeners();
  billy.initListeners();
  jack.initListeners();
  jack.notify();
});

// ==========================================================

// class PubSub {
//   constructor() {
//     this.handlers = [];
//   }
//   subscribe(event, handler, context) {
//     if (typeof context === 'undefined') {
//       context = handler;
//     }
//     this.handlers.push({ event: event, handler: handler.bind(context) });
//   }
//   publish(event, args) {
//     this.handlers.forEach((topic) => {
//       if (topic.event === event) {
//         topic.handler(args);
//       }
//     });
//   }
// }

// class Jack {
//   constructor() {
//     this.pubsub = new PubSub();
//     this.pubsub.subscribe('message', this.emitMessage, this);
//   }
//   emitMessage(msg) {
//     console.group('PubSub Jack');
//     console.log('<Jack say to Rose>: ', msg);
//     console.groupEnd();
//   }
//   sendMessage() {
//     this.pubsub.publish('message', 'This is Jack. I love you and want to be with you, Rose!');
//   }
// }

// class Rose {
//   constructor() {
//     this.pubsub = new PubSub();
//     this.pubsub.subscribe('message', this.emitMessage, this);
//   }
//   emitMessage(msg) {
//     console.group('PubSub Rose');
//     console.log('<Rose say to Billy>: ', msg);
//     console.groupEnd();
//   }
//   sendMessage() {
//     this.pubsub.publish('message', 'This is Rose. Jask loves me. Run, Billy!');
//   }
// }

// class Billy {
//   constructor() {
//     this.pubsub = new PubSub();
//     this.pubsub.subscribe('message', this.emitMessage, this);
//   }
//   emitMessage(msg) {
//     console.group('PubSub Billy');
//     console.log('<Billy say to Rose>: ', msg);
//     console.groupEnd();
//   }
//   sendMessage() {
//     this.pubsub.publish(
//       'message',
//       'This is Billy. Goodbye, my love, goodbye! I will not bother you'
//     );
//   }
// }

// let billy = new Billy();
// let jack = new Jack();
// let rose = new Rose();

// $('#btn').on('click', () => {
//   jack.sendMessage(rose);
//   rose.sendMessage(billy);
//   billy.sendMessage(rose);
// });
