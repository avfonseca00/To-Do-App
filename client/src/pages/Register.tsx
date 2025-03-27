import { Button, Container, Flex, Heading, HStack, Input, Separator, Text, VStack } from "@chakra-ui/react"
import { Field } from "@/components/ui/field"
import { useForm } from "react-hook-form"
import { RiGoogleFill } from "react-icons/ri"
import { PasswordInput } from "@/components/ui/password-input"
import axios from "axios"
import { toaster, Toaster } from "@/components/ui/toaster"
import AuthLayout from "@/layouts/authLayout"
import { useNavigate } from "react-router-dom"

interface FormValues {
  name: string
  email: string
  password: string 
}

const Register = () => {

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>()

  const navigate = useNavigate()

  const onSubmit = handleSubmit(async(data) => {

    // console.log(data)
    try {
      const response = await axios.post('http://127.0.0.1:5000/api/auth/register', data)
      toaster.create({
        title: response.data.message,
        type: 'success',
      })      
      setTimeout(() => {
        navigate(`/login`);
      }, 3000);

    } catch (error) {
      console.log('error', error)
      return toaster.create({
        title: "An unknown error has ocurred",
        type: 'error',
      })
    }

  });

  return (
    <AuthLayout>
      <Flex flex={1.2} justify={"center"} paddingBlock={{base: 12, md: 24}}>
        <Container paddingInline={{base: 4, md: 6, lg: 8}} maxW={'md'}>
          <VStack gap={8}>
            <VStack gap={2}>
              <Heading size={{base: '2xl', md:'3xl'}}>Create an account</Heading>
              <Text color={'fg.muted'}>Start creating your tasks</Text>
            </VStack>
            <form onSubmit={onSubmit}>
              <VStack gap={6}>
                <VStack gap={5} w={'100%'}>
                  <Field
                    label="Name"
                    invalid={!!errors.name}
                    errorText={errors.name?.message}
                  >
                    <Input size={'xl'} placeholder="Type your name here"
                      {...register("name", { required: "Name is required" })}
                    />
                  </Field>
                  <Field
                    label="Email"
                    invalid={!!errors.email}
                    errorText={errors.email?.message}
                  >
                    <Input size={'xl'} placeholder="example@mail.com"
                      {...register("email", { required: "Email is required" })}
                    />
                  </Field>
                  <Field
                    label="Password"
                    invalid={!!errors.password}
                    errorText={errors.password?.message}
                  >
                    <PasswordInput size={'xl'} placeholder="Type your password"
                      {...register("password", { required: "Last name is required" })}
                    />
                  </Field>
                </VStack>
                <VStack gap={4} w={'100%'}>
                  <Button w={'100%'} size={'xl'} type="submit">Sign up</Button >
                  <Text>Already have an account? <a className="link" href="/login">Sign in</a></Text>
                  <HStack w={'100%'}>
                    <Separator flex="1" />
                    <Text flexShrink="0">Or</Text>
                    <Separator flex="1" />
                  </HStack>
                  <Button w={'100%'} size={'xl'} variant={'outline'} ><RiGoogleFill/>Continue with Google</Button >
                </VStack>
              </VStack>
            </form>
          </VStack>
        </Container>
      <Toaster/>
    </Flex>
    </AuthLayout>
  )
}

export default Register