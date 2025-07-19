import Image from "next/image";

export default function SampleImage() {
  return (
    <Image
      src="/assets/pexels1.png"
      alt="Sample Image"
      width={500}
      height={500}
    />
  );
}