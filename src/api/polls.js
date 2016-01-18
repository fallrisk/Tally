/**
 * Created by Justin on 2016-01-17.
 */

import { Router } from 'express';

const router = new Router();

function rand(top) {
  return Math.floor(Math.random() * top);
}

var _polls = [
  {
    id: 1,
    dateCreated: Date.now(),
    pollName: 'Best Web Programming Site',
    pollOptions: ['Free Code Camp!'],
    pollResults: [100]
  },
  {
    id: 2,
    dateCreated: Date.now(),
    pollName: 'Best Interpreted Programming Language',
    pollOptions: ['Python', 'Perl', 'Ruby'],
    pollResults: [90, 20, 60],
    user: null
  },
  {
    id: 3,
    dateCreated: Date.now(),
    pollName: 'Best Video Card',
    pollOptions: ["GeForce", "ATI Radeon", "Intel"],
    pollResults: [20, 30, 40],
    user: null
  },
  {
    id: 4,
    dateCreated: Date.now(),
    pollName: 'Best Past-time',
    pollOptions: ["Reading", "Writing", "Playing Video Games", "Sports"],
    pollResults: [30, 40, 50, 50],
    user: null
  },
  {
    id: 5, dateCreated: Date.now(), pollName: 'Favorite Sport',
    pollOptions: [
      "Football (Soccer)", "American Football", "Hockey", "Cricket",
      "Tennis", "Squash", "Bocce", "Curling"
    ],
    pollResults: [20, 30, 40, 50, 60, 70, 80],
    user: null
  },
  {
    id: 6,
    dateCreated: Date.now(),
    pollName: 'Best Number',
    pollOptions: ['2', '3.14', '69', '1'],
    pollResults: [2, 3, 69, 1],
    user: null
  },
  {
    id: 7,
    dateCreated: Date.now(),
    pollName: 'Best Compiled Programming Language',
    pollOptions: ['C', 'C++', 'Java'],
    pollResults: [15, 22, 44],
    user: null
  }
];

router.get('/', async (req, res) => {
  res.status(200).json(_polls);
})

router.get('/:id', async () => {
  res.status(200).json({ error: 'Not yet implemented.' });
});

export default router;
