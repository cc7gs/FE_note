console.log('program entry');
// function getComponent() {
//   return import(/* webpackChunkName: "lodash" */ 'lodash').then(_ => {
//     var element = document.createElement('div');
//     element.innerHTML = _.join(['Hello', 'webpack'], ' ');
//     return element;
//   }).catch(err => 'An error occured while loading the component');
// }
// getComponent().then(component => {
//   document.body.appendChild(component);
// }

function initComponent() {
  var button = document.createElement('button');
  var br = document.createElement('br');
  button.innerHTML = 'click me!';
  document.body.appendChild(br);
  document.body.appendChild(button);
  button.addEventListener('click', () => {
    import(/* webpackChunkName: "modleA" */ './modleA').then(module => {
      var print = module.default;
      print();
    });
  })
}
initComponent();