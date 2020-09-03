import { OfficerList } from "./officers/OfficerList.js"
import { CriminalList } from "./criminals/CriminalList.js"
import { ConvictionSelect } from "./convictions/ConvictionSelect.js"
import { OfficerSelect } from "./officers/OfficerSelect.js";
import { NoteForm } from "./notes/NoteForm.js";
import { saveNote } from "./notes/NoteProvider.js"
import { NoteList } from "./notes/NoteList.js";

OfficerList();
NoteForm();
NoteList();
CriminalList();
ConvictionSelect();
OfficerSelect();