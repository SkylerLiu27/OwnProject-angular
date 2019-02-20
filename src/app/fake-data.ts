import { Problem } from "./models/problem.model"

//fake data
export const problems : Problem[] = [
    {
      "id" : 1,
      "name" : "Move Zeroes",
      "description" : "Given an array nums, write a function to move all 0's to the end of it while maintaining the relative order of the non-zero elements.",
      "difficulty" : "easy"
    },
    {
      "id" : 2,
      "name" : "Valid Palindrome",
      "description" : "Given a string, determine if it is a palindrome, considering only alphanumeric characters and ignoring cases.",
      "difficulty" : "easy"
    },
    {
      "id" : 3,
      "name" : "Sort Colors II",
      "description" : "Given an array of n objects with k different colors (numbered from 1 to k), sort them so that objects of the same color are adjacent, with the colors in the order 1, 2, ... k.",
      "difficulty" : "medium"
    },
    {
      "id" : 4,
      "name" : "Linked List Cycle II",
      "description" : "Given a linked list, return the node where the cycle begins. If there is no cycle, return null.",
      "difficulty" : "hard"
    },
    {
      "id" : 5,
      "name" : "Sliding Window Maximum",
      "description" : "Given an array of n integer with duplicate number, and a moving window(size k), move the window at each iteration from the start of the array, find the maximum number inside the window at each moving.",
      "difficulty" : "super"
    }
  ]