import { registerBlockType } from '@wordpress/blocks';
import './style.scss';
import Edit from './edit';
import save from './save';

registerBlockType('block-course/todo-list', {
	edit: Edit,
	save,
});
