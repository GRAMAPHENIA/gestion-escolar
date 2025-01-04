import { NextApiRequest, NextApiResponse } from "next";
import type { Institution } from "@/types/institutions"; // Importación de solo tipo

let institutions: Institution[] = []; // Array temporal para almacenar datos

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    res.status(200).json(institutions);
  } else if (req.method === "POST") {
    const newInstitution: Institution = req.body;
    institutions.push(newInstitution);
    res.status(201).json(newInstitution);
  } else if (req.method === "DELETE") {
    const id = Array.isArray(req.query.id) ? req.query.id[0] : req.query.id;
    institutions = institutions.filter((inst) => inst.id !== id);
    res.status(200).json({ message: "Institución eliminada" });
  } else if (req.method === "PUT") {
    const id = Array.isArray(req.query.id) ? req.query.id[0] : req.query.id;
    const updatedInstitution: Institution = req.body;
    institutions = institutions.map((inst) =>
      inst.id === id ? updatedInstitution : inst
    );
    res.status(200).json(updatedInstitution);
  } else {
    res.setHeader("Allow", ["GET", "POST", "DELETE", "PUT"]);
    res.status(405).end(`Método ${req.method} no permitido`);
  }
}
