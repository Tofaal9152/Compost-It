import { Image } from "expo-image";

const CustomImage = ({ uri, style }: any) => {
  const blurhash =
    "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";
    console.log(uri)
  return (
    <Image
      source={{ uri }}
      style={{ ...style }}
      placeholder={{ blurhash }}
      contentFit="cover"
      transition={1000}
    />
  );
};

export default CustomImage;
