import React from 'react';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';

import { FixedSizeGrid as Grid } from 'react-window';
import InfiniteLoader from 'react-window-infinite-loader';
import AutoSizer from 'react-virtualized-auto-sizer';


const GUTTER_SIZE = 10;

const Postit = ({list, params}) => {
  let isUpdate = useSelector((state) => state.postit.isUpdate);
  const [postits, setPostits] = useState([]);
  const getPostits = () => {
    axios.get(`http://localhost:3003/postits/`).then((res) => {
      setPostits(res.data);
    });
  };
  useEffect(() => {
    getPostits();
  }, [isUpdate]);
  return (
    <>
      <div className='row'>
        {postits.map((postit) => {
          return (
            <div className='col-md-4 col-sm-6 content-card' key={postit.id}>
              <div className='card-big-shadow'>
                <div
                  className='card card-just-text'
                  data-background='color'
                  data-color={postit.color}
                  data-radius='none'
                >
                  <div className='content'>
                    {/* <h4 className='title fs-6'>{postit.title}</h4> */}
                    <p className='description'>{postit.content}</p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};
export default Postit;
