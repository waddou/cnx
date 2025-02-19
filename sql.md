CREATE TABLE Users (
    id VARCHAR(255) PRIMARY KEY,
    username VARCHAR(255) NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    passwordHash VARCHAR(255) NOT NULL,
    createdAt DATETIME NOT NULL,
    role ENUM('USER', 'ADMIN', 'MODERATOR') NOT NULL,
    lastLogin DATETIME NULL
);

CREATE TABLE Words (
    id INT PRIMARY KEY AUTO_INCREMENT,
    word VARCHAR(255) NOT NULL,
    categoryId INT NOT NULL,
    difficultyId INT NOT NULL,
    createdById VARCHAR(255) NOT NULL,
    createdAt DATETIME NOT NULL,
    updatedAt DATETIME NULL,
    status ENUM('PENDING', 'APPROVED', 'REJECTED') NOT NULL DEFAULT 'PENDING',
    FOREIGN KEY (createdById) REFERENCES Users(id),
    FOREIGN KEY (categoryId) REFERENCES Categories(id),
    FOREIGN KEY (difficultyId) REFERENCES Difficulties(id)
);

CREATE TABLE Categories (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL UNIQUE
);

CREATE TABLE Difficulties (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL UNIQUE
);

CREATE TABLE SavedSearches (
    id INT PRIMARY KEY AUTO_INCREMENT,
    userId VARCHAR(255) NOT NULL,
    query VARCHAR(255) NOT NULL,
    createdAt DATETIME NOT NULL,
    FOREIGN KEY (userId) REFERENCES Users(id)
);

CREATE TABLE Comments (
    id INT PRIMARY KEY AUTO_INCREMENT,
    wordId INT NOT NULL,
    userId VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    createdAt DATETIME NOT NULL,
    FOREIGN KEY (wordId) REFERENCES Words(id),
    FOREIGN KEY (userId) REFERENCES Users(id)
);

CREATE TABLE Votes (
    id INT PRIMARY KEY AUTO_INCREMENT,
    wordId INT NOT NULL,
    userId VARCHAR(255) NOT NULL,
    voteType ENUM('UP', 'DOWN') NOT NULL,
    createdAt DATETIME NOT NULL,
    FOREIGN KEY (wordId) REFERENCES Words(id),
    FOREIGN KEY (userId) REFERENCES Users(id),
    UNIQUE (wordId, userId)
);

CREATE TABLE GameSessions (
    id INT PRIMARY KEY AUTO_INCREMENT,
    userId VARCHAR(255) NOT NULL,
    startTime DATETIME NOT NULL,
    endTime DATETIME NULL,
    score INT NOT NULL DEFAULT 0,
    FOREIGN KEY (userId) REFERENCES Users(id)
);

CREATE TABLE GameSessionWords (
    id INT PRIMARY KEY AUTO_INCREMENT,
    gameSessionId INT NOT NULL,
    wordId INT NOT NULL,
    isCorrect BOOLEAN NOT NULL,
    responseTime INT NOT NULL,
    FOREIGN KEY (gameSessionId) REFERENCES GameSessions(id),
    FOREIGN KEY (wordId) REFERENCES Words(id)
);

CREATE TABLE Notifications (
    id INT PRIMARY KEY AUTO_INCREMENT,
    userId VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    createdAt DATETIME NOT NULL,
    isRead BOOLEAN NOT NULL DEFAULT FALSE,
    FOREIGN KEY (userId) REFERENCES Users(id)
);

CREATE TABLE WordRelations (
    id INT PRIMARY KEY AUTO_INCREMENT,
    wordId1 INT NOT NULL,
    wordId2 INT NOT NULL,
    relationType ENUM('SYNONYM', 'ANTONYM', 'RELATED') NOT NULL,
    createdAt DATETIME NOT NULL,
    FOREIGN KEY (wordId1) REFERENCES Words(id),
    FOREIGN KEY (wordId2) REFERENCES Words(id),
    UNIQUE (wordId1, wordId2, relationType)
);

CREATE TABLE WordDefinitions (
    id INT PRIMARY KEY AUTO_INCREMENT,
    wordId INT NOT NULL,
    definition TEXT NOT NULL,
    isMainDefinition BOOLEAN NOT NULL DEFAULT FALSE,
    createdAt DATETIME NOT NULL,
    FOREIGN KEY (wordId) REFERENCES Words(id)
);

CREATE TABLE Puzzles (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    categoryId INT NOT NULL,
    difficultyId INT NOT NULL,
    createdById VARCHAR(255) NOT NULL,
    createdAt DATETIME NOT NULL,
    FOREIGN KEY (categoryId) REFERENCES Categories(id),
    FOREIGN KEY (difficultyId) REFERENCES Difficulties(id),
    FOREIGN KEY (createdById) REFERENCES Users(id)
);

CREATE TABLE PuzzleClues (
    id INT PRIMARY KEY AUTO_INCREMENT,
    puzzleId INT NOT NULL,
    clue TEXT NOT NULL,
    answerId INT NOT NULL,
    createdAt DATETIME NOT NULL,
    FOREIGN KEY (puzzleId) REFERENCES Puzzles(id),
    FOREIGN KEY (answerId) REFERENCES Words(id)
);

CREATE TABLE PuzzleAttempts (
    id INT PRIMARY KEY AUTO_INCREMENT,
    puzzleId INT NOT NULL,
    userId VARCHAR(255) NOT NULL,
    attempt VARCHAR(255) NOT NULL,
    isCorrect BOOLEAN NOT NULL,
    createdAt DATETIME NOT NULL,
    FOREIGN KEY (puzzleId) REFERENCES Puzzles(id),
    FOREIGN KEY (userId) REFERENCES Users(id)
);

-- Trigger to ensure that Words.definition is always equal to the main definition in WordDefinitions
DELIMITER //
CREATE TRIGGER update_word_definition_after_insert
AFTER INSERT ON WordDefinitions
FOR EACH ROW
BEGIN
    IF NEW.isMainDefinition = TRUE THEN
        UPDATE Words
        SET definition = NEW.definition
        WHERE id = NEW.wordId;
    END IF;
END;
//
DELIMITER ;

DELIMITER //
CREATE TRIGGER update_word_definition_after_update
AFTER UPDATE ON WordDefinitions
FOR EACH ROW
BEGIN
    IF NEW.isMainDefinition = TRUE THEN
        UPDATE Words
        SET definition = NEW.definition
        WHERE id = NEW.wordId;
    END IF;
END;
//
DELIMITER ;