CREATE TABLE IF NOT EXISTS Listeners (
    id VARCHAR(255) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    nickname VARCHAR(64) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(255) NOT NULL DEFAULT "NORMAL"
);

CREATE TABLE IF NOT EXISTS Genre (
	id VARCHAR(255) PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS Musics (
	id VARCHAR(255) PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    author_id VARCHAR(255) NOT NULL,
    date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    file VARCHAR(2083) NOT NULL,
    genre_id VARCHAR(255) NOT NULL,
    album VARCHAR(255) NOT NULL,
    FOREIGN KEY(author_id) REFERENCES Listeners(id),
    FOREIGN KEY(genre_id) REFERENCES Genre(id)
);