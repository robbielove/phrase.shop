import {PartType} from '../wordbanks';
import {generatePhrasePlain, PhraseStruct} from "./phrase";
import {PhrasePart} from "./PhrasePart";

describe("phrase", () => {
  const testMutator = (word: PhrasePart, depWord?: PhrasePart) => {
    word.setPlainValue(`plain ${word.getPartType()} (dep: ${depWord?.getPartType()})`);
  };

  describe("generatePhrasePlain()", () => {
    it("mutates phrase parts", () => {
      const noun = new PhrasePart(PartType.noun);
      const digit = new PhrasePart(PartType.digit);

      const phrStruct: PhraseStruct = {
        order: [digit, noun],
        depTree: {
          leaves: [
            {
              value: digit,
              leaves: [
                {
                  value: noun,
                  leaves: [],
                }
              ]
            }
          ]
        }
      };

      generatePhrasePlain(phrStruct, testMutator);

      expect(phrStruct.order[0].getPlaintext()).toBe("plain digit (dep: undefined)");
      expect(phrStruct.order[1].getPlaintext()).toBe("plain noun (dep: digit)");
    });
  })
});