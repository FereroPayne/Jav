PRAGMA foreign_keys = ON;
--SUPPRESSIONS DE LA tables
DROP TABLE IF EXISTS "Produit";

--struct de table--
CREATE TABLE IF NOT EXISTS "Produit"(
    "nom" VARCHAR(50) PRIMARY KEY AUTO_INCREMENT,
    "quantite" INT NOT NULL,
    CHECK (quantite >= 0)
     );

--Sructure de la table:
INSERT INTO "Produit" ("nom","quantite") VALUES
('Jak',74 ),
('Mallette',98 ),
('Jacquette',22 ),
('Kell', 56);


