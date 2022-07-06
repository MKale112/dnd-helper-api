import express, { Request, Response } from 'express';
import Character from '../models/Character';
import axios from 'axios';
import { calculateInitialHP, calculateProfBonus, embedSavingThrows } from '../utils/characterUtils';
import { CharacterCreationInput } from '../types/characters';

export const getCharacters = async (req: Request, res: Response) => {
  const { id } = req.body.locals;
  try {
    // console.log(id);
    const characters = await Character.find({ playerId: id });
    // console.log(characters);
    if (!characters) {
      return res.status(200).json([]);
    }

    res.status(200).json(characters);
  } catch (error) {
    console.log(error);
  }
};

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

    const hitpointMax = calculateInitialHP(hit_die, level, attributes.constitution);
    const saves = embedSavingThrows(saving_throws);
    const proficiencyBonus = calculateProfBonus(level);

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
      hitpointMax,
      proficiencyBonus,
      saves,
    });

    const newChar = await character.save();

    res.status(200).json(newChar);
  } catch (err) {
    console.log(err);
  }
};

export const deleteCharacter = async (req: Request, res: Response) => {
  try {
    const char = await Character.findById(req.params.id);
    if (!char) {
      return res.status(404).json({ msg: 'char not found' });
    }

    // check if the user that is deleting the post actually OWNS the post
    if (char.id.toString() !== req.params.id) {
      res.status(401).json({ msg: 'User not authorised' });
    }

    await char.remove();
    res.json({ msg: 'Character removed!' });
  } catch (error: any) {
    console.log(error);
    res.status(500).json('Server Error');
  }
};

export const updateCharacter = async (req: Request, res: Response) => {
  try {
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

    const char = await Character.findById(req.params.id);
    if (!char) {
      return res.status(404).json({ msg: 'char not found' });
    }

    // check if character actually belogns to the user
    // HERE

    const response = await axios.get(`https://www.dnd5eapi.co/api/classes/${characterClass.toLowerCase()}`);
    const { hit_die, saving_throws, url } = response.data;

    const hitpointMax = calculateInitialHP(hit_die, level, attributes.constitution);
    const saves = embedSavingThrows(saving_throws);
    const proficiencyBonus = calculateProfBonus(level);

    char.characterName = characterName;
    char.gender = gender;
    char.race = race;
    char.level = level;
    char.characterClass = characterClass;
    char.attributes = attributes;
    char.weapon = weapon;
    char.armor = armor;
    char.shield = shield;
    char.bio = bio;
    char.wallet = wallet;
    char.hitpointMax = hitpointMax;
    char.saves = saves;
    char.proficiencyBonus = proficiencyBonus;

    await char.save();

    res.status(200).json({ msg: 'Character Updated!' });
  } catch (err) {
    console.log(err);
  }
};
