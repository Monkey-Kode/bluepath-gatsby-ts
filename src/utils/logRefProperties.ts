export default function logRefProperties(ref: React.RefObject<HTMLDivElement>) {
  if (ref.current) {
    console.log(
      "--------------- scrollableRef.current properties: ---------------",
    );
    for (const prop in ref.current) {
      try {
        const value = ref.current[prop as keyof HTMLDivElement];
        if (typeof value !== "function") {
          console.log(`${prop}: ${value}`);
        }
      } catch (error) {
        console.log(`${prop}: [Unable to access]`);
      }
    }
  } else {
    console.log("scrollableRef.current is null");
  }
  console.log(
    "--------------- scrollableRef.current properties: ---------------",
  );
}
