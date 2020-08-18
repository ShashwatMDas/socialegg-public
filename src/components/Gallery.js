import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
const tileData = [
    {
      img: 'https://images.unsplash.com/photo-1476242906366-d8eb64c2f661?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
      title: 'Breakfast',
      author: 'jill111',
      cols: 2,
      featured: true,
    },
    {
      img: 'https://images.unsplash.com/photo-1585282263872-36fa5ae76e60?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1951&q=80',
      title: 'Tasty burger',
      author: 'director90',
    },
    
    {
      img: 'https://images.unsplash.com/photo-1564313687867-09130f165eed?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
      title: 'Honey',
      author: 'fancycravel',
    },
    {
      img: 'https://images.unsplash.com/photo-1554731617-8eafa9975365?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
      title: 'Vegetables',
      author: 'jill111',
      cols: 2,
    },

    {
      img: 'https://www.twipemobile.com/wp-content/uploads/2016/11/b-nikkeift-a-20150806.png',
      title: 'Sea star',
      cols: 2,
      author: '821292',
    },
    {
      img: 'https://images.unsplash.com/photo-1572949645841-094f3a9c4c94?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
      title: 'Bike',
      author: 'danfador',
    },
    {
        img: 'https://techcrunch.com/wp-content/uploads/2013/10/tc-splash6.jpg?w=730&crop=1',
        title: 'Bike',
        author: 'danfador',
      },
    {
        img: 'https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80',
        title: 'Sea star',
        cols: 2,
        author: '821292',
      },
    
  ];


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: '100%',
    height: '100%',
  },
}));

export default function ImageGridList() {
  const classes = useStyles();

  return (
      <div>
    <div className={classes.root}>
      <GridList cellHeight={160} className={classes.gridList} cols={3}>
        {tileData.map((tile) => (
          <GridListTile key={tile.img} cols={tile.cols || 1}>
            <img src={tile.img} alt={tile.title} />
          </GridListTile>
        ))}
      </GridList>

    </div>
    </div>
  );
}