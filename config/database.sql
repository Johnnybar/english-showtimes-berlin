
CREATE TABLE cinemas(
    id SERIAL PRIMARY KEY,
    api_id INTEGER NOT NULL,
    name VARCHAR(300) NOT NULL,
    area VARCHAR(300) NOT NULL,
    address VARCHAR(300) NOT NULL,
    imgurl text
);

CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    user_id INTEGER,
    selected text
);
