import { useRef, useState } from 'react';

type Link = {
  link: string;
  customName: string;
};

interface LinkTypes {
  setLinkId: (linkId: string) => void;
  setCustomLink: (customLink: string) => void;
}

const AddLinkForm: React.FC<LinkTypes> = ({ setLinkId, setCustomLink }) => {
  const input = useRef<HTMLInputElement>(null);
  const customName = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string | null>(null);
  const urlPattern =
    /^(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)$/;

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault();
    let url = input.current!.value;

    if (!urlPattern.test(url)) {
      setError('Please enter a valid URL');
      return;
    }

    if (!/^https?:\/\//i.test(url)) {
      url = 'https://' + url;
    }

    const data = await (
      await fetch('/api/addlink', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          link: url,
          customName: customName.current!.value,
        }),
      })
    ).json();

    setLinkId(data.link);
    setCustomLink(data.customName);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input type='text' placeholder='Enter long URL' ref={input} />
        <input type='text' placeholder='Enter custom name' ref={customName} />
        <button type='submit'>Shorten</button>
      </form>
      {error ? <div>{error}</div> : null}
    </>
  );
};

export default AddLinkForm;
