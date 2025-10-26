import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Album } from "./album/album.entity";
import { Comment } from "./comment/comment.entity";
import { Prize } from "./prize/prize.entity";
import { Track } from "./track/track.entity";
import { CollectorAlbum } from './collectoralbum/collectoralbum.entity';
import { Band } from './band/band.entity';
import { Collector } from './collector/collector.entity';
import { Musician } from './musician/musician.entity';
import { Performer } from './performer/performer.entity';
import { PerformerPrize } from './performerprize/performerprize.entity';

import { RecordLabelModule } from './recordlabel/recordlabel.module';
import { PrizeModule } from './prize/prize.module';
import { TrackModule } from './track/track.module';
import { CollectorModule } from './collector/collector.module';
import { PerformerModule } from './performer/performer.module';
import { BandModule } from './band/band.module';
import { MusicianModule } from './musician/musician.module';
import { AlbumModule } from './album/album.module';
import { GenreModule } from './genre/genre.module';
import { CommentModule } from './comment/comment.module';
import { CollectorAlbumModule } from './collectoralbum/collectoralbum.module';
import { AlbumstatusModule } from './albumstatus/albumstatus.module';
import { PerformerprizeModule } from './performerprize/performerprize.module';
import { BandmusicianModule } from './bandmusician/bandmusician.module';
import { MusicianAlbumModule } from './musicianalbum/musicianalbum.module';
import { BandAlbumModule } from './bandalbum/bandalbum.module';
import { CollectorPerformerModule } from './collectorperformer/collectorperformer.module';
import { AlbumBandModule } from './albumband/albumband.module';
import { AlbumMusicianModule } from './albummusician/albummusician.module';

const ENTITIES = [
  Album, CollectorAlbum, Band, Collector, Comment, Musician, Performer, PerformerPrize, Prize, Track,
];

@Module({
  imports: [
    // 👉 Usa DATABASE_URL en Heroku; localhost en desarrollo
    TypeOrmModule.forRootAsync({
      useFactory: () => {
        const isProd = process.env.NODE_ENV === 'production';
        if (process.env.DATABASE_URL) {
          return {
            type: 'postgres' as const,
            url: process.env.DATABASE_URL,      // ¡Heroku!
            entities: ENTITIES,
            dropSchema: false,
            synchronize: true,                   // deja true si es lo que usa el curso
            keepConnectionAlive: true,
            migrations: [__dirname + '/migration/**/*{.ts,.js}'],
            migrationsRun: true,
            // SSL para RDS/Heroku
            ssl: isProd ? true : false,
            extra: isProd ? { ssl: { rejectUnauthorized: false } } : undefined,
          };
        }
        // Local (tu máquina)
        return {
          type: 'postgres' as const,
          host: process.env.DB_HOST || 'localhost',
          port: +(process.env.DB_PORT || 5432),
          username: process.env.DB_USER || 'postgres',
          password: process.env.DB_PASS || 'postgres',
          database: process.env.DB_NAME || 'vinyls',
          entities: ENTITIES,
          dropSchema: false,
          synchronize: true,
          keepConnectionAlive: true,
          migrations: [__dirname + '/migration/**/*{.ts,.js}'],
          migrationsRun: true,
        };
      },
    }),

    RecordLabelModule,
    PrizeModule,
    TrackModule,
    CollectorModule,
    PerformerModule,
    BandModule,
    MusicianModule,
    AlbumModule,
    GenreModule,
    CommentModule,
    CollectorAlbumModule,
    AlbumstatusModule,
    PerformerprizeModule,
    BandmusicianModule,
    MusicianAlbumModule,
    BandAlbumModule,
    CollectorPerformerModule,
    AlbumBandModule,
    AlbumMusicianModule,
  ],
})
export class AppModule {}
