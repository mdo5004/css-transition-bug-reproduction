import React from 'react';
import './App.css';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { createUseStyles } from 'react-jss'

const useStyles = createUseStyles({
  root: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
    '& input': {
      width: 400,
      margin: '2rem',
    },
  },
  enter: {
    opacity: 0,
  },
  enterActive: {
    opacity: 1,
    transition: 'opacity 1000ms ease',
  },
  enterDone: {
    opacity: 1,
  },
  exit: {
    opacity: 1,
  },
  exitActive: {
    opacity: 0,
    transition: 'opacity 1000ms ease',
  },
  exitDone: {
    opacity: 0,
  },
  appear: {},
  appearActive: {},
  appearDone: {},
});

function App() {
  const classes = useStyles();
  const [items, setItems] = React.useState([
    { text: 'Item one' },
    { text: 'Item two' },
  ]);
  const fixedItemsArray = [
    { text: '' },
    { text: '' },
    { text: '' },
    { text: '' },
  ];

  function setText(index) {
    return function onChange(e) {
      const newItems = items.slice();
      if (!newItems[index]) {
        newItems[index] = { text: '' };
      }
      newItems[index].text = e.target.value;
      setItems(newItems);
    }
  }
  function onAddItem() {
    const newItems = items.slice();
    newItems.push({ text: '' });
    setItems(newItems);
  }
  function onDeleteItem() {
    const newItems = [...items.slice(0, items.length - 1)];
    setItems(newItems);
  }
  return (
    <div className={classes.root}>
      <TransitionGroup component={null}>
        {fixedItemsArray.map((item, index) => {
          const text = items[index] && items[index].text;
          console.log({ item: items[index], index, in: !!text });
          return <CSSTransition
            key={index.toString()}
            timeout={1000}
            appear
            classNames={{
              enter: classes.enter,
              enterActive: classes.enterActive,
              exit: classes.exit,
              exitActive: classes.exitActive,
              enterDone: classes.enterDone,
              exitDone: classes.exitDone,
              appear: classes.appear,
              appearActive: classes.appearActive,
              appearDone: classes.appearDone,
            }}
            in={!!items[index]}
          >
            <div>
              <input value={text || ''} onChange={setText(index)} placeholder='You should only ever see one of these' />
              <span>in should = {`${!!items[index]}`}</span>
            </div>
          </CSSTransition>
        })}
      </TransitionGroup>
      {items.length < 4 ? <button onClick={onAddItem}>add item</button> : null}
      {items.length > 0 ? <button onClick={onDeleteItem}>delete item</button> : null}
    </div>
  );
}

export default App;
