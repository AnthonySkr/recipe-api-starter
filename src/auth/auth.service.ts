import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { StorageService } from '../storage/storage.service';

export interface User {
  id: string;
  email: string;
  owner: string;
  role: 'admin' | 'user';
  key: string;
  createdAt: string;
}

const API_KEYS_FILE = 'api-keys.json';

@Injectable()
export class AuthService {
  constructor(private readonly storage: StorageService) {}

  register(email: string): { apiKey: string } {
    const users = this.storage.read<User[]>(API_KEYS_FILE);

    if (users.some((u) => u.email === email)) {
      throw new ConflictException(`Email ${email} is already registered`);
    }

    const newUser: User = {
      id: uuidv4(),
      email,
      owner: email,
      role: 'user',
      key: uuidv4(),
      createdAt: new Date().toISOString(),
    };

    this.storage.write(API_KEYS_FILE, [...users, newUser]);

    return { apiKey: newUser.key };
  }

  getMe(apiKey: string): User {
    const users = this.storage.read<User[]>(API_KEYS_FILE);
    const user = users.find((u) => u.key === apiKey);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  regenerateKey(apiKey: string): { apiKey: string } {
    const users = this.storage.read<User[]>(API_KEYS_FILE);
    const index = users.findIndex((u) => u.key === apiKey);
    if (index === -1) {
      throw new NotFoundException('User not found');
    }

    const newKey = uuidv4();
    users[index] = { ...users[index], key: newKey };
    this.storage.write(API_KEYS_FILE, users);

    return { apiKey: newKey };
  }

  deleteAccount(apiKey: string): void {
    const users = this.storage.read<User[]>(API_KEYS_FILE);
    const index = users.findIndex((u) => u.key === apiKey);
    if (index === -1) {
      throw new NotFoundException('User not found');
    }

    users.splice(index, 1);
    this.storage.write(API_KEYS_FILE, users);
  }

  findByApiKey(apiKey: string): User | undefined {
    const users = this.storage.read<User[]>(API_KEYS_FILE);
    return users.find((u) => u.key === apiKey);
  }
}
