import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { v4 as uuidv4 } from 'uuid';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class StorageService {
  private readonly uploadDir: string;

  constructor(private readonly configService: ConfigService) {
    this.uploadDir = path.join(process.cwd(), 'uploads');
    if (!fs.existsSync(this.uploadDir)) {
      fs.mkdirSync(this.uploadDir, { recursive: true });
    }
  }

  async uploadFile(
    file: Express.Multer.File,
    directory: string,
  ): Promise<{ url: string; key: string }> {
    // In production: use Google Cloud Storage
    // For development: store locally
    const ext = path.extname(file.originalname);
    const key = `${directory}/${uuidv4()}${ext}`;
    const filePath = path.join(this.uploadDir, key);

    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    fs.writeFileSync(filePath, file.buffer);

    const baseUrl = this.configService.get<string>(
      'APP_URL',
      'http://localhost:3000',
    );

    return {
      url: `${baseUrl}/uploads/${key}`,
      key,
    };
  }

  async deleteFile(key: string): Promise<void> {
    const filePath = path.join(this.uploadDir, key);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
  }

  async getSignedUrl(key: string): Promise<string> {
    // In production: generate signed URL from GCS
    const baseUrl = this.configService.get<string>(
      'APP_URL',
      'http://localhost:3000',
    );
    return `${baseUrl}/uploads/${key}`;
  }
}
