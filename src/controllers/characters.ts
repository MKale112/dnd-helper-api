import express, { Request, Response } from 'express';
import Character from '../models/Character';
import axios from 'axios';
import { calculateInitialHP, calculateProfBonus, embedSavingThrows } from '../utils/characterUtils';
import { CharacterCreationInput } from '../types/characters';

// export const getCharacters = async (req: Request, res: Response) => {
//   const { id } = req.body;
//   try {
//     const characters = await Character.findById(id);

//     if (!characters) {
//       return res.status(200).json([]);
//     }

//     res.status(200).json(characters)
//   } catch (error) {
//     console.log(error);
//   }
// };

export const addCharacter = async (req: Request, res: Response) => {
  const {
    playerId,
    characterName,
    gender,
    race,
    level,
    characterClass,
    attributes,
    weapon,
    armor,
    shield,
    bio,
    wallet,
  } = req.body as CharacterCreationInput;

  try {
    let character = await Character.findOne({ characterName });
    if (character) {
      return res.status(400).json({ errors: [{ msg: 'This character already exist.' }] });
    }

    const response = await axios.get(`https://www.dnd5eapi.co/api/classes/${characterClass.toLowerCase()}`);
    const { hit_die, saving_throws, url } = response.data;
    console.log('dnd server fetch', res);

    const hitpoint_max = calculateInitialHP(hit_die, level, attributes.constitution);
    const saves = embedSavingThrows(saving_throws);
    const proficiency_bonus = calculateProfBonus(level);

    character = new Character({
      playerId,
      characterName,
      status: 'alive',
      gender,
      race,
      level,
      characterClass,
      attributes,
      weapon,
      armor,
      shield,
      bio,
      wallet,
      hitpoint_max,
      proficiency_bonus,
      saves,
    });

    const newChar = await character.save();

    res.status(200).json(newChar);
  } catch (err) {
    console.log(err);
  }
};
