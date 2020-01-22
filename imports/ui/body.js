
import {Template} from 'meteor/templating';
import {ReactiveDict} from 'meteor/reactive-dict';
import './body.html';
import './tarea.js';
import {Tareas} from '../api/tareas.js';

Template.body.onCreated(function bodyOnCreated() {
	this.state = new ReactiveDict();
});

Template.body.helpers({
  tareas(){
  	const instance = Template.instance();
  	if (instance.state.get('hideCompleted')) {
  		return Tareas.find({ checked: {$ne: true}}, 
  			{sort: {createdAt: -1}});
  	}
  	return Tareas.find({}, {sort: {createdAt: -1}});
  },
  incompleteCount(){
  	return Tareas.find({checked: {$ne: true}}).count();
  },
});

Template.body.events({
 'submit .nueva-tarea'(event){
 	event.preventDefault();

 	const target = event.target;
 	const tarea = target.tarea.value;

 	Tareas.insert({
 		tarea,
 		createdAt: new Date(),
 		owner: Meteor.userId(),
 		username: Meteor.user().username,
 	});

 	target.tarea.value= '';
 },

 'change .hide-completed input'(event, instance){
 	instance.state.set('hideCompleted', event.target.checked);
 },
});