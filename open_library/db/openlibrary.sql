PGDMP                      |           openlibrary    16.4    16.4     �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            �           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            �           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false                        1262    24653    openlibrary    DATABASE     �   CREATE DATABASE openlibrary WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'English_United States.1252';
    DROP DATABASE openlibrary;
                postgres    false            �            1259    32782    books    TABLE     9  CREATE TABLE public.books (
    book_id integer NOT NULL,
    author character varying(100) NOT NULL,
    title character varying(50) NOT NULL,
    description text NOT NULL,
    image character varying(256) NOT NULL,
    published timestamp without time zone NOT NULL,
    in_stock integer DEFAULT 5 NOT NULL
);
    DROP TABLE public.books;
       public         heap    postgres    false            �            1259    32787    books_book_id_seq    SEQUENCE     �   ALTER TABLE public.books ALTER COLUMN book_id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.books_book_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    217            �            1259    32798    reservations    TABLE     �   CREATE TABLE public.reservations (
    reservation_id integer NOT NULL,
    date timestamp without time zone NOT NULL,
    user_id integer NOT NULL,
    book_id integer NOT NULL
);
     DROP TABLE public.reservations;
       public         heap    postgres    false            �            1259    32797    reservations_reservation_id_seq    SEQUENCE     �   ALTER TABLE public.reservations ALTER COLUMN reservation_id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.reservations_reservation_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    220            �            1259    24654    users    TABLE     &  CREATE TABLE public.users (
    user_id integer NOT NULL,
    first_name character varying(100) NOT NULL,
    last_name character varying(100) NOT NULL,
    email character varying(100) NOT NULL,
    password_hash character varying(256) NOT NULL,
    is_admin boolean DEFAULT false NOT NULL
);
    DROP TABLE public.users;
       public         heap    postgres    false            �            1259    24664    users_user_id_seq    SEQUENCE     �   ALTER TABLE public.users ALTER COLUMN user_id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.users_user_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    215            �          0    32782    books 
   TABLE DATA           `   COPY public.books (book_id, author, title, description, image, published, in_stock) FROM stdin;
    public          postgres    false    217   Z       �          0    32798    reservations 
   TABLE DATA           N   COPY public.reservations (reservation_id, date, user_id, book_id) FROM stdin;
    public          postgres    false    220   "       �          0    24654    users 
   TABLE DATA           _   COPY public.users (user_id, first_name, last_name, email, password_hash, is_admin) FROM stdin;
    public          postgres    false    215   j                  0    0    books_book_id_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public.books_book_id_seq', 6, true);
          public          postgres    false    218                       0    0    reservations_reservation_id_seq    SEQUENCE SET     M   SELECT pg_catalog.setval('public.reservations_reservation_id_seq', 6, true);
          public          postgres    false    219                       0    0    users_user_id_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public.users_user_id_seq', 4, true);
          public          postgres    false    216            ]           2606    24663    users email 
   CONSTRAINT     G   ALTER TABLE ONLY public.users
    ADD CONSTRAINT email UNIQUE (email);
 5   ALTER TABLE ONLY public.users DROP CONSTRAINT email;
       public            postgres    false    215            a           2606    32786    books primary 
   CONSTRAINT     R   ALTER TABLE ONLY public.books
    ADD CONSTRAINT "primary" PRIMARY KEY (book_id);
 9   ALTER TABLE ONLY public.books DROP CONSTRAINT "primary";
       public            postgres    false    217            c           2606    32802    reservations reservations_pkey 
   CONSTRAINT     h   ALTER TABLE ONLY public.reservations
    ADD CONSTRAINT reservations_pkey PRIMARY KEY (reservation_id);
 H   ALTER TABLE ONLY public.reservations DROP CONSTRAINT reservations_pkey;
       public            postgres    false    220            _           2606    24661    users user_id 
   CONSTRAINT     P   ALTER TABLE ONLY public.users
    ADD CONSTRAINT user_id PRIMARY KEY (user_id);
 7   ALTER TABLE ONLY public.users DROP CONSTRAINT user_id;
       public            postgres    false    215            d           2606    32808    reservations book_fk    FK CONSTRAINT     �   ALTER TABLE ONLY public.reservations
    ADD CONSTRAINT book_fk FOREIGN KEY (book_id) REFERENCES public.books(book_id) NOT VALID;
 >   ALTER TABLE ONLY public.reservations DROP CONSTRAINT book_fk;
       public          postgres    false    4705    220    217            e           2606    32803    reservations user_fk    FK CONSTRAINT     �   ALTER TABLE ONLY public.reservations
    ADD CONSTRAINT user_fk FOREIGN KEY (user_id) REFERENCES public.users(user_id) NOT VALID;
 >   ALTER TABLE ONLY public.reservations DROP CONSTRAINT user_fk;
       public          postgres    false    215    220    4703            �   �  x��U�r�6>KO��"ɢ"��9�N�x�N�&�Lg<�$� �T���δ/�'�PJ�D�xF�!p����>�v&3����n�.K�ck|��ѯJܘ˖��e2�ٲ�$5�%Υ�--O��ᨴ$t���nD�2eV�4��&lSje�?9j���e2(�����N5�8�boד�T;�����yb�˗�������������������S]�����tw<ݣ��0���Tz�I�=��88����5Y�zit8uThvt"l&�P#��uҫΕK b�7V;B�o礠ܚ
X�p�j��ڻ��7l����
?H~��ϟx5���o��l�;8gC�F��np��|�F�v@~���R))*:�Zj�(\�f�H��q�啕�3*��������߹+�΍�n����g��<�όA��p�<�ʂ��qC�v�]c�����2�ƈa-����@�\�lGt�yzo��=
����|\O��οGu�{P� lL�E��(�;��`��� �ע6������A�pAN d-�"9Hf1Hn�2�@Ep����x����B$RO��C��la�c�i��iG�K�̅�(���VAi�kU��rY�>����R��0����1���՛���k���Q9�W����G:�,�بe�b/Q,Z�f�`-�W䢒�>���RB���d!��7�=�9��zt��m���iP�z
ȢA,H6֨�Bq%t�B0�,��z!i��=dFت��d�V��Z���㆘{Dsg.q�F��&��n��Y8�}�c�"��H����3*i�|o���2��P�B"�Pemc!�-?7L}�m@�h�H����w��FY�.�m�ݻ��"�����-���7a\ͩ��b����<��fF��b=�n ;�A-2�:]��{j}l���za/���[���������'_���/�j�a�ǂ�~N���Y(�J��U o���Gf��>�k0���P��w>˅�t&㘨�ȁa��(/C�,�(�&��W� ��1�B��u��\=��d�zc?�8?�
����a�e"��i�w0h̕��[C�k��~��0_"�)z�F#B����7�׎�%a;�d09�彠��J����W�� 7��ȑ��>���n0��^��/(y��0~����fWg��>壓��O��t:
�o��_���8����=1N�L��ῢcK�      �   8   x�3�4202�5��52T00�#NCNS.c��Bƈӈ���!�VC�L� �k%      �   �  x�}��K�1ǟ�wܳ�I��>�pS������K���MO9o�_�=O(!�>�|��O��ݡ�~���|��|{���#z\^|��y��$�r���nS7���燛����Y������eOE��2�2�h��+2�Ԝ��X�u�2�%���]2)`M֙�,��`HM(K��H�V$��#��)����Zw?��Ճ��y��Eo�O��Un��wW���@�b 	r2D��r� )�{M-�cwM�62	��j�n�GKs�T��Ct0�	����6J�C�k�H���[e(�QiZ�r��e�ߙn�����w����=]�|��۟kbG��{V�9�a1���G�f�
���q���� 5ee-����sъ��Z
�%c�lh4r(cT@�4���&~YN���v�}�ݢ����۽��o��W_��6�96D��,�E��TjS3���p��=5�x&/��*��y��XJS�r)]����9`*Ĩ�%�� F�:s���[m�~��h�Z��H��     