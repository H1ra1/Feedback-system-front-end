'use client';

import colors from "@/styles/colors.module.scss";
import { Button, useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";
import { HiOutlineArrowsRightLeft } from "react-icons/hi2";
import { IoMdAddCircleOutline, IoMdRemoveCircleOutline } from "react-icons/io";

type RatingUser = {
  id: string;
  name: string;
}

type SelectUsersToRateProps = {
  ratingUserCode: string;
  next: (next: boolean) => void;
}

export default function SelectUsersToRate({ ratingUserCode, next }: SelectUsersToRateProps) {
  const [usersToAdd, setUsersToAdd] = useState<RatingUser[]>([]);
  const [usersSelected, setUsersSelected] = useState<RatingUser[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const toast = useToast();

  function addUser(user: RatingUser, indexUser: number) {
    const selectionLimit = usersSelected.length > 10 ? usersSelected.length : 10;
    if (usersSelected.length >= selectionLimit)
      return;

    setUsersToAdd((prev) => {
      const removeUser = prev.filter((user, index) => index != indexUser);

      return removeUser;
    });

    setUsersSelected((prev) => [
      ...prev,
      user
    ]);
  }

  function removeUser(user: RatingUser, indexUser: number) {
    setUsersSelected((prev) => {
      const removeUser = prev.filter((user, index) => index != indexUser);

      return removeUser;
    });

    setUsersToAdd((prev) => [
      ...prev,
      user
    ]);
  }

  async function getUsers() {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/rating/user/code/${ratingUserCode}/users/`);

    setIsLoading(false);

    if (!response.ok)
      return false;

    const result = await response.json();
    const sortedAvailable = result.data.available.toSorted((a: { feedback_user_id: string, name: string }, b: { feedback_user_id: string, name: string }) => {
      if (a.name < b.name) {
        return -1;
      } else if (a.name > b.name) {
        return 1;
      }

      return 0;
    });

    setUsersToAdd(sortedAvailable.map((user: { feedback_user_id: string, name: string }) => ({
      id: user.feedback_user_id,
      name: user.name
    })));

    setUsersSelected(result.data.selected.map((user: { feedback_user_id: string, name: string }) => ({
      id: user.feedback_user_id,
      name: user.name
    })));
  }

  async function updateUsers() {
    setIsLoading(true);


    const usersToRateId = usersSelected.map((user) => user.id);

    if (usersToRateId.length < 5) {
      toast({
        status: 'error',
        title: 'Erro!',
        description: 'Selecione no mínimo 5 usuários.',
        position: 'bottom-right',
        isClosable: true
      });

      setIsLoading(false);
      return false;
    }

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/rating/user/code/${ratingUserCode}/users/define/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(usersToRateId)
    });

    if (!response.ok) {
      toast({
        status: 'error',
        title: 'Erro!',
        description: 'Erro ao definir usuários, atualize a página ou tente em uma janela anônima.',
        position: 'bottom-right',
        isClosable: true
      });

      return false;
    }

    next(true);
  }

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className="w-screen h-screen bg-gradient-to-br from-slate-50 to-indigo-200 flex items-center justify-center">
      <div className="container border rounded-md bg-slate-50 shadow-sm flex flex-col gap-4">
        <div className="border-b p-4">
          <p className="font-semibold text-lg">Selecionar usuários para avaliar</p>
        </div>

        <div className="grid grid-cols-2 gap-16 px-4 mt-4 relative">
          <div className="rounded-md border relative pt-5">
            <div className="absolute left-0 -top-3 px-4 flex justify-between items-center w-full">
              <p className="bg-slate-50 font-semibold flex gap-2 items-baseline"><FaUser /> Usuários disponíveis</p>

              <div className="border shadow-sm rounded-md h-8 w-10 bg-slate-50 flex justify-center items-center -mt-2">
                <span className="font-medium">{usersToAdd.length}</span>
              </div>
            </div>

            <div className="flex flex-col gap-2 p-4 max-h-72 overflow-y-auto">
              {usersToAdd.map((user, index) => (
                <div
                  key={index}
                  onClick={_ => addUser(user, index)}
                  className="flex items-center justify-between rounded-md border p-4 shadow-sm cursor-pointer transition-all group hover:scale-[102%] active:scale-95">
                  <p className="text-ellipsis text-nowrap overflow-hidden w-4/5">{user.name}</p>
                  <IoMdAddCircleOutline size={22} className="group-hover:scale-105" />
                </div>
              ))}
            </div>
          </div>

          <HiOutlineArrowsRightLeft className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" size={22} />

          <div className="rounded-md border relative pt-5">
            <div className="absolute left-0 -top-3 px-4 flex justify-between items-center w-full">
              <p className="bg-slate-50 font-semibold flex gap-2 items-baseline"><FaUser /> Usuários selecionados</p>

              <div className="border shadow-sm rounded-md h-8 w-10 bg-slate-50 flex justify-center items-center -mt-2">
                <span className="font-medium">{usersSelected.length}</span>
              </div>
            </div>

            <div className="flex flex-col gap-2 p-4 max-h-72 overflow-y-auto">
              {usersSelected.map((user, index) => (
                <div
                  key={index}
                  onClick={_ => removeUser(user, index)}
                  className="flex items-center justify-between rounded-md border p-4 shadow-sm cursor-pointer transition-all group hover:scale-[102%] active:scale-95">
                  <p className="text-ellipsis text-nowrap overflow-hidden w-4/5">{user.name}</p>
                  <IoMdRemoveCircleOutline size={22} className="group-hover:scale-105" />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="p-4 pt-0">
          <Button
            size='md'
            backgroundColor={colors.highlightColor}
            className="ml-auto flex"
            color={colors.baseLight}
            _hover={{
              backgroundColor: colors.highlightColorMore
            }}
            onClick={updateUsers}
            isLoading={isLoading}
          >
            Avançar
          </Button>
        </div>
      </div>
    </div>
  )
}
