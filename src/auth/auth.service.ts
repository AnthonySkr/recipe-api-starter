import { Injectable } from '@nestjs/common';
import { StorageService } from '../storage/storage.service';

export interface ApiKey {
  key: string;
  owner: string;
}

@Injectable()
export class AuthService {
  constructor(private readonly storage: StorageService) {}

  findByApiKey(apiKey: string): ApiKey | undefined {
    const apiKeys = this.storage.read<ApiKey[]>('api-keys.json');
    return apiKeys.find((k) => k.key === apiKey);
  }
}
