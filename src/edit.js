import { useBlockProps } from '@wordpress/block-editor';
import './editor.scss';
import { useSelect, useDispatch } from '@wordpress/data';
import { CheckboxControl, TextControl, Button } from '@wordpress/components';
import { useState } from '@wordpress/element';
export default function Edit() {
  const [newTodo, setNewTodo] = useState('');
  const [addingTodo, setAddingTodo] = useState(false);
  const todos = useSelect((select) => {
    return select('block-course/todos')?.getTodos();
  }, []);

  const actions = useDispatch('block-course/todos');
  const addTodo = actions && actions.addTodo;
  const toggleTodo = actions && actions.toggleTodo;

  return (
    <div {...useBlockProps()}>
      {!todos && <p>Pleas make sure your plugin is activated</p>}

      {todos && (
        <>
          <ul>
            {todos.map((todo, index) => {
              return (
                <li key={todo.id} className={todo.completed && 'todo-completed'}>
                  <CheckboxControl
                    disabled={todo?.loading}
                    label={todo.title}
                    checked={todo.completed}
                    onChange={() => {
                      if (toggleTodo) {
                        toggleTodo(index, todo);
                      }
                    }}
                  />
                </li>
              );
            })}
          </ul>
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              if (addTodo && newTodo) {
                setAddingTodo(true);
                await addTodo(newTodo);
                setNewTodo('');
                setAddingTodo(false);
              }

              console.log(newTodo);
            }}
            className="addtodo-form"
          >
            <TextControl
              value={newTodo}
              onChange={(v) => {
                setNewTodo(v);
              }}
            />
            <Button type="submit" isPrimary disabled={addingTodo}>
              Add Todo
            </Button>
          </form>
        </>
      )}
    </div>
  );
}
