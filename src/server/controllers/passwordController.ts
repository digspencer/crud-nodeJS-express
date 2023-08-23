// controllers/passwordController.ts
import { Request, Response } from 'express';
import db from '../../db/database';
import sqlite3 from 'sqlite3';
import Password from '../model/passwordModel';

const passwordController = {
  getAllPasswords: (req: Request, res: Response) => {
    db.all('SELECT * FROM passwords', (err, rows: Password[]) => {
      if (err) {
        return res.status(500).json({ error: 'Internal Server Error' });
      }
      res.json(rows);
    });
  },

  getPasswordById: (req: Request, res: Response) => {
    const id = req.params.id;
    db.get('SELECT * FROM passwords WHERE id = ?', id, (err, row: Password) => {
      if (err) {
        return res.status(500).json({ error: 'Internal Server Error' });
      }
      if (!row) {
        return res.status(404).json({ error: 'Password not found' });
      }
      res.json(row);
    });
  },

  createPassword: (req: Request, res: Response) => {
    const { service, username, password } = req.body;
    db.run(
      'INSERT INTO passwords (service, username, password) VALUES (?, ?, ?)',
      [service, username, password],
      function (err) {
        if (err) {
          return res.status(500).json({ error: 'Internal Server Error' });
        }
        res.json({ id: this.lastID });
      }
    );
  },

  updatePassword: (req: Request, res: Response) => {
    const id = req.params.id;
    const { service, username, password } = req.body;
    db.run(
      'UPDATE passwords SET service = ?, username = ?, password = ? WHERE id = ?',
      [service, username, password, id],
      function (err) {
        if (err) {
          return res.status(500).json({ error: 'Internal Server Error' });
        }
        if (this.changes === 0) {
          return res.status(404).json({ error: 'Password not found' });
        }
        res.sendStatus(204);
      }
    );
  },

  deletePassword: (req: Request, res: Response) => {
    const id = req.params.id;
    db.run('DELETE FROM passwords WHERE id = ?', id, function (err) {
      if (err) {
        return res.status(500).json({ error: 'Internal Server Error' });
      }
      if (this.changes === 0) {
        return res.status(404).json({ error: 'Password not found' });
      }
      res.sendStatus(204);
    });
  },
};

export default passwordController;
