import {Template} from 'meteor/templating';
import {Tareas} from '../api/tareas.js';
import './tarea.html';

Template.tarea.events({
	'click .toggle-checked'(){
  	Tareas.update(this._id, {
  		$set: {checked: ! this.checked},
  	});

  },

  'click .delete'(){
  	Tareas.remove(this._id);

  },
});